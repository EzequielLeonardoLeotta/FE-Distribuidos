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
 
   const deleteProducto  = (id:string) => {
     const body = {id}
     fetch("http://localhost:8081/api/v1/producto", {
       method: "DELETE",
       body: JSON.stringify(body),
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
       },
     }).then((response) => {
       props.getProductos();
       console.log(response);
     });
   }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">nombre</StyledTableCell>
            <StyledTableCell align="left">precio</StyledTableCell>
            <StyledTableCell align="left">categoria</StyledTableCell>
            <StyledTableCell align="center">accion</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row:any) => (
            <StyledTableRow key={row.categoria}>
              <StyledTableCell align="left">
                {row.nombre}
              </StyledTableCell>
              <StyledTableCell align="left">{row.precio}</StyledTableCell>
              <StyledTableCell align="left">{row.categoria}</StyledTableCell>
              <StyledTableCell align="center"><Button color="secondary" onClick={()=>deleteProducto(row._id)}>Eliminar</Button> </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}