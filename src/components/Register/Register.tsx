import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../../config";
import { ClientRoutes } from "../../config/enums";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import { UsuarioService } from "../../fetch/UsuarioService";

const Register: React.FC = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState<number>();
  const [domicilios, setDomicilios] = useState<string[]>([""]);
  const [tarjetas, setTarjetas] = useState<string[]>([""]);
  const [cuentas, setCuentas] = useState<string[]>([""]); //En el servicio es un array de number
  const [telefono, setTelefono] = useState<number>();
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);

      await auth.createUserWithEmailAndPassword(email, contraseña);

      UsuarioService.saveUsuario({
        nombre: nombre,
        apellido: apellido,
        usuario: nombreUsuario,
        //@ts-ignore
        dni: dni,
        domicilios: domicilios,
        //@ts-ignore
        telefono: telefono,
        tarjetas: tarjetas,
        cuentas: cuentas.map(c => Number(c)),
        saldo: 0,
        email: email
      })

      const currentUser = auth.currentUser;
      localStorage.setItem(
        "UNLaLibre.JWT",
        (await currentUser?.getIdToken()) || ""
      );
      localStorage.setItem("UNLaLibre.NombreUsuario", nombreUsuario);

      setOpen(true);
      setTimeout(() => {
        history.push(ClientRoutes.HOME);
      }, 3000);
    } catch (error: any) {
      alert("Error: " + error.code + ": " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (value: string, index: number, tipo: string) => {
    switch (tipo) {
      case "domicilios":
        const arrayDomicilios = [...domicilios];
        arrayDomicilios[index] = value;
        setDomicilios(arrayDomicilios);
        break;

      case "tarjetas":
        const arrayTarjetas = [...tarjetas];
        arrayTarjetas[index] = value;
        setTarjetas(arrayTarjetas);
        break;

      case "cuentas":
        const arrayCuentas = [...cuentas];
        arrayCuentas[index] = value;
        setTarjetas(arrayCuentas);
        break;
    
      default:
        break;
    }
  };

  const handleRemoveClick = (index: number, tipo: string) => {
    switch (tipo) {
      case "domicilios":
        const arrayDomicilios = [...domicilios];
        arrayDomicilios.splice(index, 1);
        setDomicilios(arrayDomicilios);
        break;

      case "tarjetas":
        const arrayTarjetas = [...tarjetas];
        arrayTarjetas.splice(index, 1);
        setTarjetas(arrayTarjetas);
        break;

      case "cuentas":
        const arrayCuentas = [...cuentas];
        arrayCuentas.splice(index, 1);
        setCuentas(arrayCuentas);
        break;
    
      default:
        break;
    }
  };

  const handleAddClick = (tipo: string) => {
    switch (tipo) {
      case "domicilios":
        setDomicilios([...domicilios, ""]);
        break;

      case "tarjetas":
        setTarjetas([...tarjetas, ""]);
        break;

      case "cuentas":
        setCuentas([...cuentas, ""]);
        break;
    
      default:
        break;
    }
  };

  return (
    <Container component="main" maxWidth="sm" style={{ padding: "1rem" }}>
      <Typography
        variant="h6"
        style={{
          textAlign: "center",
          paddingBottom: "1rem",
        }}
      >
        ¡Registrate para poder comprar y vender 100% online!
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={(event) => setNombre(event.target.value)}
          id="nombre"
          label="Nombre"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem" }}
        />
        <TextField
          onChange={(event) => setApellido(event.target.value)}
          id="apellido"
          label="Apellido"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem" }}
        />
        <TextField
          onChange={(event) => setNombreUsuario(event.target.value)}
          id="nombreUsuarui"
          label="Nombre de Usuario"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem" }}
        />
        <TextField
          onChange={(event) => setDni(Number(event.target.value))}
          id="dni"
          label="DNI"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem" }}
        />
        
        {domicilios.map((item: string, index: number) => {
          return (
            <>
              <Grid container spacing={2} style={{ width: "100%", paddingBottom: "1rem" }} alignItems='center' alignContent='center'/>
                <div style={{display: "flex"}}>
                  <TextField
                    //@ts-ignore
                    onChange={(event) => handleInputChange(event.target.value, index, "domicilios")}
                    label="Domicilio"
                    type="domicilio"
                    variant="outlined"
                    required
                    style={{ width: domicilios.length === index + 1 ? "95%" : "100%", paddingBottom: "1rem" }}
                  />
                    {domicilios.length !== 1 && domicilios.length === index + 1 &&
                      <div onClick={() => handleRemoveClick(index, "domicilios")}>
                        <RemoveOutlinedIcon style={{paddingLeft: '4px', cursor: 'pointer'}} />
                      </div>
                    }
                    {domicilios.length - 1 === index && 
                      <div onClick={() => handleAddClick("domicilios")}>
                      <AddOutlinedIcon style={{paddingLeft: '4px', cursor: 'pointer'}} />
                    </div>
                    }
                </div>
              <Grid/>
            </>
            )
        })}

        {tarjetas.map((item: string, index: number) => {
          return (
            <>
              <Grid container spacing={2} style={{ width: "100%", paddingBottom: "1rem" }} alignItems='center' alignContent='center'/>
                <div style={{display: "flex"}}>
                  <TextField
                    //@ts-ignore
                    onChange={(event) => handleInputChange(event.target.value, index, "tarjetas")}
                    label="Tarjeta"
                    type="tarjeta"
                    variant="outlined"
                    required
                    style={{ width: tarjetas.length === index + 1 ? "95%" : "100%", paddingBottom: "1rem" }}
                  />
                    {tarjetas.length !== 1 && tarjetas.length === index + 1 &&
                      <div onClick={() => handleRemoveClick(index, "tarjetas")}>
                        <RemoveOutlinedIcon style={{paddingLeft: '4px', cursor: 'pointer'}} />
                      </div>
                    }
                    {tarjetas.length - 1 === index && 
                      <div onClick={() => handleAddClick("tarjetas")}>
                      <AddOutlinedIcon style={{paddingLeft: '4px', cursor: 'pointer'}} />
                    </div>
                    }
                </div>
              <Grid/>
            </>
            )
        })}

        {cuentas.map((item: string, index: number) => {
          return (
            <>
              <Grid container spacing={2} style={{ width: "100%", paddingBottom: "1rem" }} alignItems='center' alignContent='center'/>
                <div style={{display: "flex"}}>
                  <TextField
                    //@ts-ignore
                    onChange={(event) => handleInputChange(event.target.value, index, "cuentas")}
                    label="Cuenta"
                    type="cuenta"
                    variant="outlined"
                    required
                    style={{ width: cuentas.length === index + 1 ? "95%" : "100%", paddingBottom: "1rem" }}
                  />
                    {cuentas.length !== 1 && cuentas.length === index + 1 &&
                      <div onClick={() => handleRemoveClick(index, "cuentas")}>
                        <RemoveOutlinedIcon style={{paddingLeft: '4px', cursor: 'pointer'}} />
                      </div>
                    }
                    {cuentas.length - 1 === index && 
                      <div onClick={() => handleAddClick("cuentas")}>
                      <AddOutlinedIcon style={{paddingLeft: '4px', cursor: 'pointer'}} />
                    </div>
                    }
                </div>
              <Grid/>
            </>
            )
        })}

        <TextField
          onChange={(event) => setTelefono(Number(event.target.value))}
          label="Telefono"
          type="telefono"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem" }}
        />

        <TextField
          onChange={(event) => setEmail(event.target.value)}
          label="Email"
          type="email"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem" }}
        />
        <TextField
          onChange={(event) => setContraseña(event.target.value)}
          label="Contraseña"
          type="password"
          variant="outlined"
          required
          style={{ width: "100%", paddingBottom: "1rem" }}
        />
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Button
            disabled={isSubmitting}
            variant="contained"
            color="secondary"
            type="submit"
            style={{ width: "40%" }}
          >
            Enviar
            {isSubmitting && (
              <CircularProgress
                size="1.2rem"
                style={{ marginLeft: "1.1rem" }}
              />
            )}
          </Button>
        </div>
        <Typography style={{ textAlign: "center", paddingTop: "15px" }}>
          Ya tenes una cuenta? <Link href={ClientRoutes.LOGIN}>Ingresar</Link>
        </Typography>
      </form>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert color="success" severity="success" variant="filled">
          ¡Te registraste correctamente!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
