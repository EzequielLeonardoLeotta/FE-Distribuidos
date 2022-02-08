import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { ClientRoutes } from '../config/enums'
import {Grid} from "@material-ui/core";
import ListaReclamos from "../components/MesaDeAyuda/ReclamosLista"
import ListaDenuncias from "../components/MesaDeAyuda/DenunciasLista"
import ListaProducto from "../components/MesaDeAyuda/ProductoLista"
import { useState } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import { Divider } from '@material-ui/core';


interface TabPanelProps {
     children?: React.ReactNode;
     dir?: string;
     index: any;
     value: any;
   }
   
   function TabPanel(props: TabPanelProps) {
     const { children, value, index, ...other } = props;
   
     return (
       <div
         role="tabpanel"
         hidden={value !== index}
         id={`full-width-tabpanel-${index}`}
         aria-labelledby={`full-width-tab-${index}`}
         {...other}
       >
         {value === index && (
           <Box p={3}>
             <Typography>{children}</Typography>
           </Box>
         )}
       </div>
     );
   }
   
   function a11yProps(index: any) {
     return {
       id: `full-width-tab-${index}`,
       'aria-controls': `full-width-tabpanel-${index}`,
     };
   }
   
   const useStyles = makeStyles((theme: Theme) => ({
     root: {
       backgroundColor: theme.palette.background.paper,
       width: 'auto',
     },
   }));


const MesaDeAyuda: React.FC<{}> = () => {

   const [reclamos,setReclamos] = useState();
   const [denuncias,setDenuncia] = useState();
   const [productos,setProductos] = useState();

   const classes = useStyles();
   const theme = useTheme();
   const [value, setValue] = React.useState(0);
 
   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
     setValue(newValue);
   };
 
   const handleChangeIndex = (index: number) => {
     setValue(index);
   };

   useEffect (()=>{
     getReclamos();
     getDenuncias();
     getProductos();
   },[])
   
   // HOLA PRUEBA 2
   const getReclamos = () => {
     fetch("http://localhost:8081/api/v1/reclamo", { method: "GET" })
       .then((response) => response.json())
       .then((data) => {
         console.log(data);
         setReclamos(data);
       });
   };

   const getDenuncias = () => {
     fetch("http://localhost:8081/api/v1/denuncia", { method: "GET" })
       .then((response) => response.json())
       .then((data) => {
         console.log(data);
         setDenuncia(data);
       });
   };

   const getProductos = () => {
     fetch("http://localhost:8083/api/v1/producto", { method: "GET" })
       .then((response) => response.json())
       .then((data) => {
         console.log(data);
         setProductos(data);
       });
   };

  return (
    <Route exact path={ClientRoutes.MEZADEAYUDA}>
      <Grid >
      <div className={classes.root}>
           <Grid container justifyContent="center">
               <Typography variant="h1">MESA DE AYUDA</Typography>
           </Grid>
           <Divider></Divider>
           <Divider></Divider>
           <Divider></Divider>
          <br></br>
          <br></br>
          <br></br>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Productos" {...a11yProps(0)} />
          <Tab label="Denuncias" {...a11yProps(1)} />
          <Tab label="Reclamos" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <ListaProducto rows={productos} getProductos={getProductos}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <ListaDenuncias rows={denuncias} getDenuncias={getDenuncias}/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <ListaReclamos rows={reclamos} getReclamos={getReclamos}/> 
        </TabPanel>
      </SwipeableViews>
    </div>
      </Grid>
    </Route>
  )
}

export default MesaDeAyuda
