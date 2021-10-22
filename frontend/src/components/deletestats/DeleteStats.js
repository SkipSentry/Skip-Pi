import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import classnames from "classnames";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

import { VictoryPie } from "victory";

class DeleteStats extends Component {
  constructor() {
    super();
    this.state = {
      deleteMessage: false,
    };
  }

  deleteDatabase = () => {
    axios
      .get("/api/database/delete", {})
      .then((res) => {
        this.setState({
          deleteMessage: true,
        });
      })
      .catch((err) => console.log("test"));
  };

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
              <rect
                x="52.917"
                y="63.5"
                width="84.667"
                height="105.83"
                style={{
                  opacity: "0",
                  "stroke-width": ".26458",
                  stroke: "white",
                }}
              />
              <rect
                x="58.208"
                y="63.5"
                width="68.792"
                height="100.54"
                style={{
                  opacity: "0",
                  "stroke-width": ".26458",
                  stroke: "white",
                }}
              />
              <path
                d="m58.208 63.5v100.54"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m58.208 164.04v2.6458h55.562"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m113.77 166.69v-103.19"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m58.208 63.5h55.562"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m58.208 89.958h55.562"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m58.208 116.42h55.562"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m58.208 142.88h52.917 2.6458"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m52.917 52.917 66.146 124.35"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m52.917 177.27 66.146-124.35"
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
          <div className="col-sm-12">
            <span>
              <b>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-exclamation-triangle"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                  <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                </svg>
              </b>
              Warning this will reset your Stats back to 0. This can not be
              undone. Your saved IP address will not be deleted.
            </span>
          </div>
        </div>
        <div className="row">
          <div
            className="col-sm-12"
            style={{ "margin-top": "2%", borderBottom: " 2px solid white" }}
          >
            <h3>
              <b>Delete Database </b>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12" style={{ "margin-top": "2%" }}>
            {!this.state.deleteMessage ? (
              <button
                type="button"
                class="btn btn-outline-secondary text-center"
                style={{ width: "100%", "margin-top": "2%" }}
                onClick={(e) => this.deleteDatabase()}
              >
                Delete Database
              </button>
            ) : (
              <span>Database successfully deleted.</span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteStats;
