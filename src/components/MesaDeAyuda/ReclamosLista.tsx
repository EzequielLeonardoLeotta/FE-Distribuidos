import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props:any) {
  const classes = useStyles();
  const { rows } = props;

  const changeStatePut = (put: any) => {
    fetch("http://localhost:8081/api/v1/reclamo", {
      method: "PUT",
      body: JSON.stringify(put),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      props.getReclamos();
    });
  };

  const changeState  = (id:string,estado:string) => {
    const body = {id,estado}
    changeStatePut(body);
  }
  

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Reclamo</StyledTableCell>
            <StyledTableCell align="left">estado</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row:any) => (
            <StyledTableRow key={row.reclamo}>
              <StyledTableCell align="left">
                {row.reclamo}
              </StyledTableCell>
              <StyledTableCell align="left">{row.estado}</StyledTableCell>
              <StyledTableCell align="center"> <Button color="primary" onClick={()=>changeState(row._id,'A resolver')} disabled={row.estado==="A resolver"}>A resolver</Button> <Button color="secondary" onClick={()=>changeState(row._id,'Rechazado')} disabled={row.estado==="Rechazado"}>Rechazar</Button> <Button onClick={()=>changeState(row._id,'Resuelto')} disabled={row.estado==="Resuelto"}>Resolver</Button> </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}