import React from 'react'
import {Table} from 'react-bootstrap'

const TableData = ({tableData}) => {
    // console.log(tableData)
    const renderData = (Data, index) => {
      return(
        <tr key={index}>
          <td md={2}>{Data.isbn}</td>
          <td md={2}>{Data.title}</td>
          <td md={2}>{Data.author.toString()}</td>
          {
            Data.description 
            ?
              <td md={6}>{Data.description}</td>
            :
              <td md={6}>{Data.publishedAt}</td>
          }
        </tr>
      )
    }
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th md={2}>ISBN</th>
            <th md={2}>Title</th>
            <th md={2}>Author</th>
            <th md={6}>Desc/Pub</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(renderData)}
        </tbody>
      </Table>
    )
}

export default TableData
