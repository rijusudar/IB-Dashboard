import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';


import { SkelitonLoader } from './components/skeliton-loader/skeliton-loader';
import CTable from './components/table/CTable';
import { CQData } from './modules/CQData/CQData';
import './App.css';
import classes from './App.module.css';


function App() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [primaryData, setPrimaryData] = React.useState([]);


  const availableNodes = [
    "0-20",
    "21-40",
    "41-60",
    "61-75",
    "76-90",
    "overdue"
  ];


  const fetchPrimaryData = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3005/fulldata', {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
          "file": "customer_complaints_plan_WK2232.2_R_D_ALL_2022.csv",
        }),
      });
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const getData = await response.json();
      console.log("getData", getData);

      let data = getData;


      data = data.map(group => {
        const updatedGroup = { ...group };

        updatedGroup.items.map(item => {
          let totalCount = 0;
          availableNodes.map(node => {
            if (!item[node]) {
              item[node] = 0;
            } else {
              totalCount = totalCount + item[node];
            }
          })
          item.total = totalCount;
          return item;
        });
        return updatedGroup;
      });

      let grandTotal = [
        { "0-20": 0, "21-40": 0, "41-60": 0, "61-75": 0, "76-90": 0, "overdue": 0 }
      ];
      data.map(data => {
        data.items.map(item => {
          availableNodes.map(node => {
            if (node === '0-20') {
              grandTotal[0]["0-20"] = grandTotal[0]["0-20"] + item[node];
            } else if (node === '21-40') {
              grandTotal[0]['21-40'] = grandTotal[0]['21-40'] + item[node];
            } else if (node === '41-60') {
              grandTotal[0]['41-60'] = grandTotal[0]['41-60'] + item[node];
            } else if (node === '61-75') {
              grandTotal[0]['61-75'] = grandTotal[0]['61-75'] + item[node];
            } else if (node === '76-90') {
              grandTotal[0]['76-90'] = grandTotal[0]['76-90'] + item[node];
            } else if (node === 'overdue') {
              grandTotal[0]['overdue'] = grandTotal[0]['overdue'] + item[node];
            } else if (node === 'total') {
              grandTotal[0]['total'] = grandTotal[0]['total'] + item[node];
            }
          })
        })
      })
      const getSum = grandTotal.flatMap(e => Object.values(e)).reduce((a, b) => a + b);
      const nwGrandTotal = grandTotal.map(item => ({ ...item, total: getSum }))
      // console.log("grandTotal", grandTotal);
      // console.log("nwGrandTotal", nwGrandTotal);
      // console.log("data", data);

      const newArrData = [
        ...data,
        {
          "lce-group": 'Grand Total',
          items: nwGrandTotal
        }
      ];
      // console.log("nwdata", newArrData);
      setPrimaryData(newArrData);


      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  React.useEffect(() => {
    fetchPrimaryData();
  }, []);

  const primaryTblLegends = [
    {
      id: 1,
      value: "LCE Group"
    },
    {
      id: 2,
      value: "Functional Area"
    },
    {
      id: 3,
      value: "0-20"
    },
    {
      id: 4,
      value: "21-40"
    },
    {
      id: 5,
      value: "41-60"
    },
    {
      id: 6,
      value: "61-75"
    },
    {
      id: 7,
      value: "76-90"
    },
    {
      id: 8,
      value: "Overdue"
    },
    {
      id: 9,
      value: "Grand Total"
    },
  ];

  let primaryContent;

  if (primaryData.length > 0) {
    primaryContent = <CTable legends={primaryTblLegends} data={primaryData} variant="primary" colSpanLabel="lce-group" />
  }

  if (error) {
    primaryContent = <p>{"Some thing went wrong"}</p>;
  }

  if (loading) {
    primaryContent = <SkelitonLoader />;
  }


  return (
    <React.Fragment>
      <Navbar bg="dark" className="header" fixed="top">
        <Container fluid>
          <Navbar.Brand className="brand-name" href="#home">Dashboard
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid className="container-bottom">
        <Row>
          <Col>
            <CQData />
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>Primary Data</h6>
            {primaryContent}
          </Col>
        </Row>
      </Container>
    </React.Fragment >

  );
}

export default App;
