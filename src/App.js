import React from "react";

import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./routing/public";
import {MainPage,SignInPage,SignUpPage,NotFoundPage,DashboardPage} from "./pages";


import './App.css';
import PrivateRoute from "./routing/private";

function App() {




  return (
      <BrowserRouter>

          <Switch>
              <PublicRoute
                  path="/sign-in"
                  component={SignInPage}
              />
              <PublicRoute
                  path="/sign-up"
                  component={SignUpPage}
              />
              <PublicRoute
                  path="/"
                  component={MainPage}
                  exact

              />
              <PrivateRoute
                  path="/dashboard"
                  component={DashboardPage}
                  exact
              />
              <PublicRoute component={NotFoundPage} />
          </Switch>

      </BrowserRouter>
  );
}

export default App;
