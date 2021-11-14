import axios from "axios";
import app, { firestore as db } from "../config";
import { IUsuario } from "../models/usuario";

export class UsuarioService {
  static async saveUsuario (usuario: IUsuario) {
    try {
      await axios.post('http://localhost:8080/api/v1/usuario', usuario)
    } catch (error) {
      alert(error)
    }
  }

  static async signOutUser() {
    await app.auth().signOut();
    localStorage.removeItem("FaceUNLa.JWT");
    localStorage.removeItem("FaceUNLa.UserName");
    localStorage.removeItem("FaceUNLa.Nombre");
    localStorage.removeItem("FaceUNLa.Apellido");
    localStorage.removeItem("FaceUNLa.UserId");
  }
}
