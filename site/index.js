import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

import Container from "@material-ui/core/Container";

import "@fontsource/roboto";

//* Any Important Information

//! remove React.StrictMode for production
ReactDOM.render(
    
    
        <React.StrictMode>

            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

            <Container maxWidth={false}>

                <App />

            </Container>

        </React.StrictMode>
    
    
    , document.getElementById("root")

);

