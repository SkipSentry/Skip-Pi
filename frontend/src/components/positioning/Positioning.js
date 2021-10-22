import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import classnames from "classnames";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

import { VictoryPie } from "victory";

class Positioning extends Component {
  constructor() {
    super();
    this.state = {
      deleteMessage: false,
    };
  }

  render() {
    return (
      <div className="container-fluid ">
        <div className="row" style={{ "margin-top": "8%", color: "white" }}>
          <div className="col-sm-12 text-center">
            <svg
              width="400"
              height="400"
              version="1.1"
              viewBox="0 0 210 297"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m52.917 58.208v111.12"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m47.625 174.62 5.2917-5.2917 5.2917 5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m74.083 148.17v-5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m79.375 142.88v5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m74.083 148.17h5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m74.083 142.88h5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m79.375 142.88v-5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m84.667 137.58v15.875"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m84.667 153.46h-5.2917l1e-6 -5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m79.375 137.58h5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m63.5 137.58 5.2917 5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m68.792 148.17-5.2917 5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m111.13 127v-5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m116.42 121.71v5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m111.13 127h5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m111.13 121.71h5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m116.42 121.71v-5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m121.71 116.42v15.875"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m121.71 132.29h-5.2917l1e-5 -5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m116.42 116.42h5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m100.54 116.42 5.2917 5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m105.83 127-5.2917 5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m105.83 169.33v-5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m111.12 164.04v5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m105.83 169.33h5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m105.83 164.04h5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m111.12 164.04v-5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m116.42 158.75v15.875"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m116.42 174.62h-5.2917v-5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m111.12 158.75h5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m95.25 158.75 5.2917 5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m100.54 169.33-5.2917 5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
            </svg>
          </div>
        </div>

        <div className="row">
          <div
            className="col-sm-12"
            style={{ "margin-top": "2%", borderBottom: " 2px solid white" }}
          >
            <h3>
              <b>How to position </b>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrows-move"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"
                />
              </svg>
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12" style={{ "margin-top": "2%" }}>
            <span>
              Below are some examples of the training data. If you can make it
              look like one of those you're all set. Happy skipping!{" "}
            </span>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-sm-3" style={{ "margin-top": "2%" }}>
            <img src={require("./case1.jpg")} width="200px" height="200px" />
          </div>
          <div className="col-sm-3" style={{ "margin-top": "2%" }}>
            <img src={require("./case2.jpg")} width="200px" height="200px" />
          </div>
          <div className="col-sm-3" style={{ "margin-top": "2%" }}>
            <img src={require("./case3.jpg")} width="200px" height="200px" />
          </div>
          <div className="col-sm-3" style={{ "margin-top": "2%" }}>
            <img src={require("./case4.jpg")} width="200px" height="200px" />
          </div>
        </div>
      </div>
    );
  }
}

export default Positioning;
