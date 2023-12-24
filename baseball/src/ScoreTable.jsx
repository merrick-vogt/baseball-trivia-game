import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function ScoreTable({teamAScores, teamBScores}) {
  // Sample data for two teams
  const rows = [
    { teamName: 'Team A', inning1: teamAScores[0], inning2: teamAScores[1], inning3: teamAScores[2] },
    { teamName: 'Team B', inning1: teamBScores[0], inning2: teamBScores[1], inning3: teamBScores[2] }
  ];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Team Name</TableCell>
            <TableCell align="right">Inning 1</TableCell>
            <TableCell align="right">Inning 2</TableCell>
            <TableCell align="right">Inning 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.teamName}>
              <TableCell component="th" scope="row">
                {row.teamName}
              </TableCell>
              <TableCell align="right">{row.inning1}</TableCell>
              <TableCell align="right">{row.inning2}</TableCell>
              <TableCell align="right">{row.inning3}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ScoreTable;
