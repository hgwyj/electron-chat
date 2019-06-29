import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { Router } from "react-router";
import { createHashHistory } from "history";
import AppStart from "./App";

render(
    <Router history={createHashHistory()}>
        <AppStart />
    </Router>,
    document.getElementById("root")
);