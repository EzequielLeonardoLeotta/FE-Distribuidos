import {
  Badge,
  Button,
  Grid,
  Input,
  TextField,
  Typography,
} from "@material-ui/core";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import React, { useState } from "react";
import { useEffect } from "react";
import useStyles from "../../styles/styles";
import { storage, firestore } from "../../config";
import ItemCard from "../Card/card";
import { firestore as db } from "../../config";
import UserCard from "../Card/userCard";
import { ClientRoutes } from "../../config/enums";
import { useHistory } from "react-router";
import axios from "axios";
import { IProducto } from "../../models/producto";

const Home: React.FC = () => {
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [users, setUsers] = useState([]);
  const [seguidos, setSeguidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [imagenesProductos, setImagenesProductos] = useState<any>([]);
  const [isVerNotificaciones, setIsVerNotificaciones] = useState(false);

  useEffect(() => {
    getProductos()

    setTimeout(() => {
      getProductos()
    }, 3000);
  }, []);

  const history = useHistory();

  const getProductos = async () => {
    await axios.get('http://localhost:8080/api/v1/producto')
      .then(res => setProductos(res.data))
      .catch()
  };

  const onFileChange = (e: any) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => reader.readyState === 2 && setFile(file);
      reader.readAsDataURL(e.target.files[0]);
    } else setFile(null);
  };

  const cerrarSesion = () => {
    localStorage.setItem("FaceUNLa.JWT", "");
    localStorage.setItem("FaceUNLa.UserName", "");
    localStorage.setItem("FaceUNLa.Nombre", "");
    localStorage.setItem("FaceUNLa.Apellido", "");
    localStorage.setItem("FaceUNLa.UserId", "");
    history.push(ClientRoutes.LOGIN);
  };

  return (
    <Grid container>
      <Grid item xs={8} className={classes.grid}>
        <Typography variant="h2">Productos</Typography>
        <br />
        <Button
          variant="contained"
          onClick={() => getProductos()}
          color="secondary"
        >
          Consultar productos
        </Button>
        <br />

        {productos?.length ? (
          productos?.map((p: IProducto) => 
            <ItemCard producto = {p} />
          )) : (
            <Typography className={classes.root} variant="h5">
              No se encontraron resultados
            </Typography>
        )}

        {/* {productos?.length ? (
          renderProductos()
        ) : (
          <Typography className={classes.root} variant="h5">
            No se encontraron resultados
          </Typography>
        )} */}
      </Grid>

      <Grid item xs={4} className={classes.grid}>
        <Typography>
          Bienvenido {localStorage.getItem("FaceUNLa.NombreUsuario")}   
          <Badge onClick={()=>setIsVerNotificaciones(!isVerNotificaciones)} color="primary">
            <NotificationsNoneRoundedIcon />
            {/* <NotificationsRoundedIcon /> */}
          </Badge>
        </Typography>
        <br/>
        <Button
          variant="contained"
          onClick={() => cerrarSesion()}
          color="secondary"
        >
          Cerrar sesión
        </Button>
        <br/>
        <br/>
        {/* Aqui notificaciones */}
        {/* {isVerNotificaciones&& notificaciones?.map((notificacion:any, i: number) => {
          if(notificacion.receiverUsername===localStorage.getItem("FaceUNLa.UserName")){
            return (
              <Typography>
              A {notificacion.senderUsername} le gustó tu post "{notificacion.titulo}"
              </Typography>
            )
          }
        })} */}

        <Typography variant="h2">Agregar post</Typography>
        <form noValidate autoComplete="off">
          <br />
          <TextField
            className={classes.root}
            // id="outlined-basic"
            label="Ingrese título"
            variant="outlined"
            onChange={(e) => setTitulo(e.target.value)}
          />
          <br />
          <Input
            className={classes.root}
            type="file"
            onChange={(e) => onFileChange(e)}
            inputProps={{
              accept: ".png, .jpg, .bmp",
            }}
          />
          <br />
          <TextField
            className={classes.root}
            // id="outlined-basic"
            label="Ingrese texto"
            variant="outlined"
            onChange={(e) => setTexto(e.target.value)}
          />
          <br />
          {/* <Button
            variant="contained"
            onClick={() => agregarPost()}
            color="secondary"
          >
            Subir post
          </Button> */}
          <br />
        </form>
        <br />
        <Typography variant="h2">Buscar personas</Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
