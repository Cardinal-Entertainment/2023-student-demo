// Leaderboard.js

import React from 'react';
import { Table } from 'react-bootstrap';

const Leaderboard = ({ data, className }) => {
  return (
    <Table className={`custom-leaderboard ${className}`} variant="dark" borderless hover size="sm">
      <thead>
        <tr>
          <th>RANK</th>
          <th>PLAYER</th>
          <th># of GAMES</th>
          <th>SCORE</th>
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
