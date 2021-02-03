import React from "react";

import { BrowserRouter, Switch } from "react-router-dom";
import PublicRoute from "./routing/public";
import {MainPage,SignInPage,NotFoundPage} from "./pages";


import './App.css';

function App() {
  return (
      <BrowserRouter>

          <Switch>
              <PublicRoute
                  path="/sign-in"
                  component={SignInPage}
              />
              <PublicRoute
                  path="/"
                  component={MainPage}
                  exact

              />
              <PublicRoute component={NotFoundPage} />
          </Switch>

      </BrowserRouter>
  );
}

export default App;
