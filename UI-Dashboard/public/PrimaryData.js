import React from 'react';

import CTable from './components/table/CTable';

export const PrimaryData = () => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [primaryData, setPrimaryData] = React.useState([]);


    const checkKeyExist = (arr, key, keyVal) => arr.some(obj => {
        return obj[key] === keyVal;
    });

    const fetchFuntionalData = datas => {
        const availableNodes = [
            "0-20",
            "21-40",
            "41-60",
            "61-75",
            "76-90",
            "overdue"
        ];
        let updatedData = [];

        const assignData = (node, functionalArea, functionalAreaValue) => {
            updatedData = updatedData.map(data => {
                const updatedGroup = { ...data };
                if (updatedGroup[functionalArea] === functionalAreaValue) {
                    if (data[node] === undefined) {
                        updatedGroup[node] = 1;
                    } else {
                        updatedGroup[node] += 1;
                    }
                }
                return updatedGroup;
            });
        }

        datas.map(data => {
            let objSet = {};
            for (let key in data) {
                // debugger;
                if (key === 'LCE Group' && !checkKeyExist(updatedData, 'lce-group', data[key])) {

                }
                if (key === 'FunctionalArea.Name' && !checkKeyExist(updatedData, 'functional-area', data[key])) {
                    objSet["functional-area"] = data[key];
                    updatedData.push(objSet);
                }
                if (key === 'TW Age Group') {
                    assignData(data[key], 'functional-area', data['FunctionalArea.Name'])
                }
            }

        });
        debugger;
        console.log("updatedData", updatedData);
    }

    const fetchPrimaryData = React.useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3005', {
                method: "POST",
                headers: new Headers({ 'content-type': 'application/json' }),
                body: JSON.stringify({
                    "file": "customer_complaints_plan_WK2232.2_R_D_ALL_2022.csv",
                    "limit": 65518
                }),
            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const getData = await response.json();
            fetchFuntionalData(getData.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
        }
    }, [])

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
