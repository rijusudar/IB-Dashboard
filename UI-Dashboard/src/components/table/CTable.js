import React from 'react';
import Table from 'react-bootstrap/Table';

import classes from './CTable.module.css';

const CTable = ({ legends, data, variant, colSpanLabel }) => {
  const getTemplate = (index, i, item, itemLength, itemLabel) => (variant === 'primary' ? (
    <tr key={index + '_' + i} >
      {i < 1 && (<td rowSpan={itemLength}>{itemLabel}</td>)}
      <td >{item["functional-area"]}</td>
      <td> {item["0-20"] === 0 ? '' : item["0-20"]}</td>
      <td> {item["21-40"] === 0 ? '' : item["21-40"]}</td>
      <td> {item["41-60"] === 0 ? '' : item["41-60"]}</td>
      <td> {item["61-75"] === 0 ? '' : item["61-75"]}</td>
      <td> {item["76-90"] === 0 ? '' : item["76-90"]}</td>
      <td> {item["overdue"] === 0 ? '' : item["overdue"]}</td>
      <td> {item["total"] === 0 ? '' : item["total"]}</td>
    </tr>
  ) : (
      <tr key={index + '_' + i} >
        {i < 1 && (<td rowSpan={itemLength}>{itemLabel}</td>)}
        < td > {item["ID"]}</td>
        <td> {item["TW ID"]}</td>
        <td> {item["Project"]}</td>
        <td> {item["Headline"]}</td>
        <td> {item["Functional Area"]}</td>
        <td> {item["TW Creation Age"]}</td>
        <td> {item["Owner"]}</td>
        <td> {item["Become Aware Age"]}</td>
        <td> {item["CQ Age"]}</td>
        <td> {item["Age in current FA"]}</td>
        <td> {item["FA History"]}</td>
        <td> {item["Remarks"]}</td>
      </tr>
    ));
  return (
    <Table bordered hover className={`${classes.table} ${variant === 'secondary' && classes.secondary}`}>
      <thead>
        <tr className={classes.tableHead}>
          {legends.map(legend => (
            <th key={legend.id}>{legend.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>

        {data.length > 0 && data.map((data, index) => {
          const itemLength = data.items.length;
          const itemLabel = data[colSpanLabel];
          return data.items.length > 0 && data.items.map((item, i) => {
            return getTemplate(index, i, item, itemLength, itemLabel)
          })
        })}
      </tbody>
    </Table >
  )
}

export default CTable;
