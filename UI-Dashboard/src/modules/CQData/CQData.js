import React from 'react';
import DataTable from 'react-data-table-component';

import { SkelitonLoader } from '../../components/skeliton-loader/skeliton-loader';

export const CQData = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [totalRows, setTotalRows] = React.useState(0);
  const [perPage, setPerPage] = React.useState(10);

  const columns = [
    {
      name: 'ID',
      selector: row => row['ID'],
    },
    {
      name: 'Project',
      selector: row => row["Project"],
    },
    {
      name: 'Headline',
      selector: row => row["Headline"],
      maxWidth: '600px',
      wrap: true,
    },
    {
      name: 'Functional Area',
      selector: row => row["FunctionalArea.Name"],
    },
    {
      name: 'Owner',
      selector: row => row["OwnerFullName"],
    },
    {
      name: 'TW Age',
      selector: row => row["TW Age"],
    },
    {
      name: 'CQ Age (Days)',
      selector: row => row["CQ Age (Days)"],
    },
    {
      name: 'FA Group',
      selector: row => row["FA Group"],
    },
    {
      name: 'LCE Group',
      selector: row => row["LCE Group"],
    },
    {
      name: 'Days in FA',
      selector: row => row["Days in FA"],
    },
    {
      name: 'CQ Age Group',
      selector: row => row["CQ Age Group"],
    },
    {
      name: 'TW Age Group',
      selector: row => row["TW Age Group"],
    }

  ];


  const fetchCQDataHandler = React.useCallback(async (page, perPage) => {
    setLoading(true);
    setError(null)
    try {
      const response = await fetch('http://localhost:3005', {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
          "file": "customer_complaints_plan_WK2232.2_R_D_ALL_2022.csv",
          "page": page,
          "limit": perPage
        }),
      });
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const getData = await response.json();
      setTotalRows(getData.total);
      console.log("new data", getData.data);
      setItems(getData.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);


  React.useEffect(() => {
    fetchCQDataHandler(1, perPage);
    // fetchPrimaryData();
  }, [perPage]);



  const handlePageChange = page => {
    console.log("page", page);
    fetchCQDataHandler(page, perPage);
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log("newPerPage", newPerPage)
    setPerPage(newPerPage);
  }

  return (
    <div>
      <h6>CQ Data</h6>
      <DataTable
        columns={columns}
        data={items}
        pagination
        paginationServer
        progressPending={loading}
        progressComponent={<SkelitonLoader />}
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </div>
  )
}
