// Leaderboard.js

import React from 'react';
import { Table } from 'react-bootstrap';

const Leaderboard = ({ data }) => {
  return (
    <Table striped borderless hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th># of Game</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.username}</td>
            <td>{item.numOfPlay}</td>
            <td>{item.score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Leaderboard;
