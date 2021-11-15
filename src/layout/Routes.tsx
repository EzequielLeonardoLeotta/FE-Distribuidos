import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFoundPage from "../components/NotFound/NotFoundPage";
import { ClientRoutes } from "../config/enums";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RegisterPage from "../pages/RegisterPage";
import MesaDeAyuda from "../pages/MesaDeAyuda";


const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ClientRoutes.LOGIN}>
          <Login />
        </Route>

        <Route exact path={ClientRoutes.HOME}>
          <Home />
        </Route>

        <Route exact path={ClientRoutes.REGISTER}>
          <RegisterPage />
        </Route>
      
        <Route exact path={ClientRoutes.MEZADEAYUDA}>
          <MesaDeAyuda />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
