import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import { IProducto } from "../../models/producto";
import { storage } from "../../config";

export {}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: 20,
    padding: 15,
    cursor: "pointer",
    justifyContent: "center"
  },
  media: {
    borderRadius: "10%",
    border: "0.5px solid",
    width: "8rem",
    height: "8rem",
  },
  contend: {
    width: "100%",
    height: "auto",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

// const getUrlImagenProducto = async (id: String) => {
//   const storageRef = storage.ref()
//   await storageRef.listAll().then((listResults) => {
//     listResults.items.forEach(async (item) => {
//       const metaData = await item.getMetadata()
//       const fileName = metaData.name.split('.')[0]

//       // if (fileName === id) {
//       //   const url = await item.getDownloadURL()
//       //   if(url) {
//       //     //@ts-ignore
//       //     document.querySelector('img').src = url
//       //     //@ts-ignore
//       //     imagen = document.querySelector('img').src
//       //   }
//       // }
//       if (fileName === id) {
//         const url = await item.getDownloadURL()
//         console.log(url)
//         return url
//       }
//     })
//   })
// }

const ItemCard = (props:{producto: IProducto}) => {
  const classes = useStyles();
  // const [liked, setLiked] = useState(false);
  
  // const likePost = () => {
  //   fetch("http://localhost:9000/notificacion", {
  //     method: "POST",
  //     body: JSON.stringify({senderUsername: localStorage.getItem("FaceUNLa.UserName"), titulo: props.post.titulo, receiverUsername: props.post.nombreUsuario}),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };

  return (
    <Card variant="outlined">
      <Grid container direction="row" alignItems="center">
     
       {/* <Grid container item xs={4} justifyContent="flex-start">
          <img className={classes.media} src={url} alt="No hay foto"/>
        </Grid> */}


        <Grid container item xs={5}>
          <CardContent className={classes.contend}>
            <Typography style={{fontWeight: 'bold'}}>{props.producto.nombre}</Typography>
            <Typography>{props.producto.precio}</Typography>
          </CardContent>
        </Grid>

        {/* <Grid container item xs={1}>
          <div onClick={() => {
              setLiked(!liked)
              likePost()
            }}>
            {liked ? <ThumbUpAltRoundedIcon/> : <ThumbUpAltOutlinedIcon/>}
          </div>
        </Grid> */}

      </Grid>
    </Card>
  );
}

export default ItemCard