import React from 'react';

import CTable from '../../components/table/CTable';

export const PrimaryData = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [primaryData, setPrimaryData] = React.useState([]);


  const checkKeyExist = (arr, key, keyVal) => arr.some(obj => {
    return obj[key] === keyVal;
  });



  const fetchFuntionalData = datas => {
    // const availableNodes = [
    //   "0-20",
    //   "21-40",
    //   "41-60",
    //   "61-75",
    //   "76-90",
    //   "overdue"
    // ];
    let updatedData = [];




    // datas.map(group => {
    //   let groupObj = {};

    //   for (let key in group) {
    //     if (key === 'LCE Group' && !checkKeyExist(updatedData, 'lce-group', group[key])) {
    //       groupObj["lce-group"] = group[key];
    //       groupObj["items"] = [];
    //       updatedData.push(groupObj);
    //     }
    //   }
    // });


    // datas.map(data => {

    //   updatedData = updatedData.map(group => {

    //     let updatedGroup = { ...group };

    //     let objSet = {};
    //     if (data['LCE Group'] === updatedGroup['lce-group']) {
    //       if (updatedGroup.items && updatedGroup.items.length > 0) {

    //         updatedGroup = updatedGroup.items.map(item => {

    //           const updatedItem = { ...item };
    //           if (updatedItem['functional-area'] === data['FunctionalArea.Name']) {

    //             if (updatedItem[data['TW Age Group']] === undefined) {
    //               updatedItem[data['TW Age Group']] = 1;
    //             } else {
    //               updatedItem[data['TW Age Group']] += 1;
    //             }

    //           }

    //           return updatedItem;
    //         });

    //         return updatedGroup;
    //       } else {
    //         objSet["functional-area"] = data['FunctionalArea.Name'];
    //         objSet[data['TW Age Group']] = 1;
    //         updatedGroup.items.push(objSet)
    //       }
    //     }
    //     return updatedGroup;
    //   });

    // });
    debugger;

    datas = datas.map(data => {
      const responseArr = [];

      const checkKeyExist = (arr, key, keyVal) => arr.some(obj => {
        return obj[key] === keyVal;
      });

      const checkSubKeyExist = (arr, key, keyVal, subKey, subKeyVal) => arr.some(obj => {
        if (obj[key] === keyVal) {
          return obj.items.some(subObj => {
            return subObj[subKey] === subKeyVal;
          })
        };
      });

      for (const key in data) {
        let groupObj = {};
        const itemsArr = [];
        const functionalObj = {};
        if (key === 'LCE Group' && !checkKeyExist(responseArr, 'lce-group', data[key])) {
          groupObj['lce-group'] = data[key];
        }
        if (key === 'FunctionalArea.Name' && !checkSubKeyExist(responseArr, 'lce-group', data['LCE Group'], 'functional-area', key)) {
          functionalObj['functional-area'] = data[key];
        }
        if (key === 'TW Age Group' && !data[key] === undefined) {
          functionalObj[data[key]] = 1
        }
        groupObj.items.push(functionalObj);
      }
    });





    // debugger;
    console.log("updatedData", updatedData);
  }

  const fetchPrimaryData = React.useCallback(async () => {
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
      // fetchFuntionalData(getData.data);
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

  return (
    <CTable legends={primaryTblLegends} data={primaryData} variant="primary" colSpanLabel="lce-group" />
  )
}
