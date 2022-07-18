import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

class App extends React.Component {
  render() {
    return (
      <div className="container ">
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/register" element={<RegisterPage />} />
              <Route path="/" element={<PrivateRoute component={HomePage} />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export { App };
