import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spinner, ButtonGroup, Button } from "reactstrap";
import classnames from "classnames";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import moment from "moment";

import { VictoryPie } from "victory";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      setupOpen: false,
      scanClicked: false,
      ipAddress: "",
      ipGood: null,
      runStatus: null,
      skipCount: 0,
      noSkipCount: 0,
      statsOpen: false,
      toggleSpinner: false,
      dropdownOpen: false,
      cameraType: 0,
      cameraNumber: 0,
      skipMethod: 0,
      hour: 0,
      endTime: "",
    };
  }

  componentDidMount() {
    let randomPromise = Promise.resolve(200);
    axios
      .all([
        axios.get("/api/skip/runStatus"),
        axios.get("/api/skip/count"),
        axios.get("/api/ipAddress/ip"),
        axios.get("/api/camera/cameraConfig"),
        axios.get("/api/skip/method"),
        axios.get("/api/skip/timer"),
        randomPromise,
      ])
      .then((responses) => {
        setInterval(this.refreshVals, 5000);
        this.setState({
          runStatus: responses[0].data.runStatus === "0" ? false : true,
          skipCount: responses[1].data.skip,
          noSkipCount: responses[1].data.NOskip,
          ipAddress: responses[2].data.tvIP,
          cameraType: responses[3].data.cameraType,
          cameraNumber: responses[3].data.cameraNumber,
          skipMethod: responses[4].data.skipMethod,
          hour: responses[5].data.hour,
        });
      })
      .then((responses) => {
        this.selectedManualIP();
      });
  }

  refreshVals = () => {
    let randomPromise = Promise.resolve(200);
    axios
      .all([
        axios.get("/api/skip/runStatus"),
        axios.get("/api/skip/count"),
        randomPromise,
      ])
      .then((responses) => {
        this.setState({
          runStatus: responses[0].data.runStatus === "0" ? false : true,
          skipCount: responses[1].data.skip,
          noSkipCount: responses[1].data.NOskip,
        });
      });
  };

  setupClicked = () => {
    this.setState({
      setupOpen: !this.state.setupOpen,
    });
  };

  scanNetwork = () => {
    this.setState({
      toggleSpinner: true,
    });
    axios
      .get("/api/ipAddress/ipList")
      .then((res) => {
        this.setState({
          listOfIP: res.data.listOfIP,
          scanClicked: true,
          toggleSpinner: false,
        });
      })
      .catch((err) => console.log("test"));
  };

  selectedIP = (e) => {
    let holdIP = e.target.innerHTML;
    axios
      .post(
        "/api/ipAddress/ipp",
        { selectedIpAddress: e.target.innerHTML },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.ipValid) {
          this.setState({
            ipAddress: holdIP,
            ipGood: true,
          });
        } else {
          this.setState({
            ipAddress: holdIP,
            ipGood: false,
          });
        }
      })
      .catch((err) => {
        this.setState({
          ipAddress: holdIP,
          ipGood: false,
        });
      });
  };

  setManualIP = (e) => {
    this.setState({
      ipAddress: e.target.value,
    });
  };

  selectedManualIP = () => {
    axios
      .post(
        "/api/ipAddress/ipp",
        { selectedIpAddress: this.state.ipAddress },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.ipValid) {
          this.setState({
            ipGood: true,
          });
        } else {
          this.setState({
            ipGood: false,
          });
        }
      })
      .catch((err) => console.log("test"));
  };

  runSkipPi = () => {
    axios
      .post("/api/skip/skip", {})
      .then((res) => {
        this.setState({
          runStatus: res.data.runStatus === "0" ? true : false,
        });
      })
      .catch((err) => console.log("test"));
  };

  statsClicked = () => {
    this.setState({
      statsOpen: !this.state.statsOpen,
    });
  };

  setCameraType = (cameraValue, cameraNumber) => {
    axios
      .post(
        "/api/camera/cameraConfig",
        { cameraType: cameraValue, cameraNumber: cameraNumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        this.setState({
          cameraType: cameraValue,
          cameraNumber: cameraNumber,
        });
      })
      .catch((err) => console.log("test"));
  };

  getCameraType = (cameraValue) => {
    axios
      .get("/api/camera/cameraConfig")
      .then((res) => {
        this.setState({
          cameraType: res.data.cameraType,
          cameraNumber: res.data.cameraNumber,
        });
      })
      .catch((err) => console.log("test"));
  };

  setSkipMethod = (skipMethod) => {
    axios
      .post(
        "/api/skip/method",
        { skipMethod: skipMethod },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (skipMethod === 0) {
          this.setState({
            skipMethod: skipMethod,
          });
        } else {
          this.setState({
            skipMethod: skipMethod,
          });
        }
      })
      .catch((err) => console.log("test"));
  };

  setSleepTime = (hour, endTime) => {
    axios
      .post(
        "/api/skip/timer",
        { hour: hour, endTime: endTime },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        this.setState({
          hour: hour,
          endTime: endTime,
        });
      })
      .catch((err) => console.log("test"));
  };

  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "dark2", // "light1", "dark1", "dark2"
      title: {
        text: "Skip Stats",
      },
      data: [
        {
          type: "pie",
          indexLabel: "{label}: {y}%",
          startAngle: -90,
          dataPoints: [
            { y: this.state.noSkipCount, label: "No Skips" },
            { y: this.state.skipCount, label: "Skips" },
          ],
        },
      ],
    };
    return (
      <div className="container-fluid ">
        <div className="row" style={{ "margin-top": "8%", color: "white" }}>
          <div className="col-sm-12 text-center">
            <svg
              width="250"
              height="250"
              version="1.1"
              viewBox="0 0 88.02 90.97"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m7.9375 15.875v50.271"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m68.792 66.146v-50.271"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m7.9375 15.875h60.854"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m68.792 66.146h-60.854"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m11.906 66.146-2.6458 2.6458"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m64.823 66.146 2.6458 2.6458"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <text
                x="58.208332"
                y="60.854164"
                style={{
                  "font-family": "sans-serif",
                  "font-size": "3.175px",
                  "line-height": "1.25",
                  "stroke-width": ".26458",
                }}
              >
                <tspan
                  x="58.208332"
                  y="60.854164"
                  style={{ "stroke-width": ".26458", stroke: "white" }}
                >
                  Skip
                </tspan>
              </text>
              <path
                d="m56.885 58.208v3.9688"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m66.146 62.177v-3.9688"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m66.146 62.177-1e-6 1.3229h-9.2604l1e-6 -1.3229"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m56.885 58.208v-1.3229"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m66.146 58.208v-1.3229l-9.2604 1e-6"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m80.698 41.01v11.906"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m88.635 52.917v-11.906"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m80.698 41.01h7.9375"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m80.698 52.917h7.9375"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m80.698 50.271h7.9375"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m83.344 50.271v2.6458"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m85.99 50.271v2.6458"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m88.635 41.01h-2.6458"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m85.99 41.01v9.2604"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m80.698 42.333h2.6458"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m80.698 43.656h2.6458l1e-6 -1.3229"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m82.021 44.979h1.3229"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m83.344 48.948h-1.3229"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m82.021 44.979v3.9688"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m83.344 44.979v3.9688"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />

              <rect
                x="62.177"
                y="71.438"
                width="3.9688"
                height="3.9688"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <rect
                x="59.531"
                y="72.76"
                width="2.6458"
                height="2.6458"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m59.531 72.76v3.9688"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m63.5 76.729v-3.9688"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m59.531 72.76h3.9688"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m59.531 76.729h3.9688"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />

              <path
                d="m62.177 76.729v2.6458"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m75.406 79.375h-13.229"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m75.406 79.375v-37.042"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m80.698 42.333h-5.2917"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m60.854 76.729v3.9688"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m60.854 80.698h15.875"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
              <path
                d="m76.729 80.698v-37.042l3.9688 1e-6"
                style={{
                  fill: "none",
                  "stroke-width": ".26458px",
                  stroke: "white",
                }}
              />
            </svg>
          </div>
        </div>
        <div className="row" style={{ "margin-top": "8%" }}>
          {(this.state.ipAddress !== "" && this.state.ipGood) ||
          this.state.skipMethod === 1 ? (
            <React.Fragment />
          ) : (
            <div className="col-sm-12">
              <span>
                To get started click{" "}
                <b>
                  Setup{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-gear"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                  </svg>{" "}
                </b>
                to scan the network for your Smart TV IP (currently Roku only)
                or enter the IP manually. After a quick check to ensure your
                Raspberry Pi and your Smart TV can talk to each other you are
                ready to start!
              </span>
            </div>
          )}
        </div>
        <div className="row">
          <div
            className="col-sm-12"
            style={{ "margin-top": "2%", borderBottom: " 2px solid white" }}
          >
            <h3 onClick={this.setupClicked} style={{ cursor: "pointer" }}>
              <b>Setup </b>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-gear"
                viewBox="0 0 16 16"
              >
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
              </svg>{" "}
              {!this.state.setupOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              )}
            </h3>
          </div>
        </div>
        {this.state.setupOpen ? (
          <div>
            <div
              className="row"
              style={{ "margin-top": "5%", "margin-bottom": "1%" }}
            >
              <h5>
                <u>How To Skip:</u>
              </h5>
              <div className="col-sm-12">
                <h7>Select a skip method: (Default Roku Over WiFi)</h7> <br />
                <ButtonGroup>
                  <Button
                    color="dark"
                    onClick={() => this.setSkipMethod(0)}
                    active={this.state.skipMethod === 0}
                  >
                    Roku Over WiFi
                  </Button>
                  <Button
                    color="dark"
                    onClick={() => this.setSkipMethod(1)}
                    active={this.state.skipMethod === 1}
                  >
                    UART to Microcontroller
                  </Button>
                </ButtonGroup>
              </div>
            </div>
            {this.state.skipMethod === 0 ? (
              <div>
                <div className="row">
                  <div className="col-sm-12">
                    <button
                      type="button"
                      class="btn btn-outline-secondary text-center"
                      style={{ width: "100%", "margin-top": "2%" }}
                      onClick={(e) => this.scanNetwork()}
                    >
                      {this.state.toggleSpinner ? (
                        <Spinner
                          color="light"
                          size="sm"
                          style={{ "margin-bottom": "5px" }}
                        />
                      ) : (
                        <React.Fragment />
                      )}{" "}
                      Scan Network
                    </button>
                  </div>
                </div>
                {this.state.scanClicked ? (
                  <div className="row rounded" style={{ "margin-top": "2%" }}>
                    <h6 style={{ "padding-left": "16px" }}>
                      TV IP Addresses Found:{" "}
                    </h6>
                    {this.state.listOfIP.length > 0 ? (
                      <React.Fragment>
                        {this.state.listOfIP.map((ipaddress, i) => (
                          <div
                            className="col-sm-12 text-center"
                            style={{ "margin-top": "5%" }}
                          >
                            <button
                              type="button"
                              class="btn btn-light"
                              style={{
                                width: "80%",
                              }}
                              onClick={(e) => this.selectedIP(e)}
                            >
                              {ipaddress}
                            </button>
                          </div>
                        ))}
                      </React.Fragment>
                    ) : (
                      <h6> No TV IPs Found :(</h6>
                    )}
                  </div>
                ) : (
                  <React.Fragment />
                )}
                <div className="row" style={{ "margin-top": "5%" }}>
                  <div className="col-sm-12">
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Manually TV IP"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={this.state.ipAddress}
                        onChange={(e) => this.setManualIP(e)}
                      />
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        onClick={(e) => this.selectedManualIP()}
                      >
                        Enter
                      </button>
                      {this.state.ipGood !== null ? (
                        <React.Fragment>
                          {this.state.ipGood ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="35"
                              fill="currentColor"
                              class="bi bi-check2"
                              viewBox="0 0 16 16"
                            >
                              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="35"
                              fill="currentColor"
                              class="bi bi-file-excel"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.18 4.616a.5.5 0 0 1 .704.064L8 7.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 8l2.233 2.68a.5.5 0 0 1-.768.64L8 8.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 8 5.116 5.32a.5.5 0 0 1 .064-.704z" />
                              <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                            </svg>
                          )}
                        </React.Fragment>
                      ) : (
                        <React.Fragment />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : this.state.skipMethod === 1 ? (
              <div style={{ "margin-bottom": "4%" }}>
                Using GPIO pins over UART. Compatible with Arduino Leonardo/Pro
                Micro type HID development microcontrollers. This is a useful
                way to connect to a non-Roku smart TV through the USB port on
                the smart TV instead of through WiFi.
                <br />
                <br /> Using <b>/dev/ttyACM0</b> at baudrate <b>9600</b>
                {". "}
              </div>
            ) : (
              <React.Fragment />
            )}
            <div className="row" style={{ "margin-top": "0%" }}>
              <h5>
                <u>Camera Type:</u>
              </h5>
              <div className="col-sm-12">
                <h7>Select a camera type: (Defult Pi Camera)</h7> <br />
                <ButtonGroup>
                  <Button
                    color="dark"
                    onClick={() => this.setCameraType(0, 0)}
                    active={this.state.cameraType === 0}
                  >
                    Pi Camera
                  </Button>
                  <Button
                    color="dark"
                    onClick={() => this.setCameraType(1, 0)}
                    active={this.state.cameraType === 1}
                  >
                    USB Camera
                  </Button>
                </ButtonGroup>
              </div>
            </div>
            {this.state.cameraType === 1 ? (
              <div className="row" style={{ "margin-top": "5%" }}>
                <div className="col-sm-12">
                  <h7>
                    Select a USB camera number: (Default is 0, usually 0 will
                    work)
                  </h7>{" "}
                  <br />
                  <Button
                    color="dark"
                    onClick={() => this.setCameraType(this.state.cameraType, 0)}
                    active={this.state.cameraNumber === 0}
                  >
                    0
                  </Button>
                  <Button
                    color="dark"
                    onClick={() => this.setCameraType(this.state.cameraType, 1)}
                    active={this.state.cameraNumber === 1}
                  >
                    1
                  </Button>
                  <Button
                    color="dark"
                    onClick={() => this.setCameraType(this.state.cameraType, 2)}
                    active={this.state.cameraNumber === 2}
                  >
                    2
                  </Button>
                  <Button
                    color="dark"
                    onClick={() => this.setCameraType(this.state.cameraType, 3)}
                    active={this.state.cameraNumber === 3}
                  >
                    3
                  </Button>
                  <Button
                    color="dark"
                    onClick={() => this.setCameraType(this.state.cameraType, 4)}
                    active={this.state.cameraNumber === 4}
                  >
                    4
                  </Button>
                  <Button
                    color="dark"
                    onClick={() => this.setCameraType(this.state.cameraType, 5)}
                    active={this.state.cameraNumber === 5}
                  >
                    5
                  </Button>
                  <Button
                    color="dark"
                    onClick={() => this.setCameraType(this.state.cameraType, 6)}
                    active={this.state.cameraNumber === 6}
                  >
                    6
                  </Button>
                  <Button
                    color="dark"
                    onClick={() => this.setCameraType(this.state.cameraType, 7)}
                    active={this.state.cameraNumber === 7}
                  >
                    7
                  </Button>
                  <Button
                    color="dark"
                    onClick={() => this.setCameraType(this.state.cameraType, 8)}
                    active={this.state.cameraNumber === 8}
                  >
                    8
                  </Button>
                  <Button
                    color="dark"
                    onClick={() => this.setCameraType(this.state.cameraType, 9)}
                    active={this.state.cameraNumber === 9}
                  >
                    9
                  </Button>
                  <Button
                    color="dark"
                    onClick={() =>
                      this.setCameraType(this.state.cameraType, 10)
                    }
                    active={this.state.cameraNumber === 10}
                  >
                    10
                  </Button>
                </div>
              </div>
            ) : (
              <React.Fragment />
            )}
            <div className="row" style={{ "margin-top": "5%" }}>
              <h5>
                <u>Set A Timer:</u>
              </h5>
              <div className="col-sm-12">
                <h7>
                  SkipPi will keep your smart TV from going to sleep forever. To
                  prevent this set a timer to turn SkipPi off. (Default is
                  Never)
                </h7>{" "}
                <br />
                <Button
                  color="dark"
                  onClick={() => this.setSleepTime(0, 0)}
                  active={this.state.hour === 0}
                >
                  Never
                </Button>
                <Button
                  color="dark"
                  onClick={() =>
                    this.setSleepTime(
                      1,
                      moment()
                        .add(1, "hours")
                        .format("YYYY-MM-DDTHH:mm:ss")
                    )
                  }
                  active={this.state.hour === 1}
                >
                  1 Hour
                </Button>
                <Button
                  color="dark"
                  onClick={() =>
                    this.setSleepTime(
                      2,
                      moment()
                        .add(2, "hours")
                        .format("YYYY-MM-DDTHH:mm:ss")
                    )
                  }
                  active={this.state.hour === 2}
                >
                  2 Hours
                </Button>
                <Button
                  color="dark"
                  onClick={() =>
                    this.setSleepTime(
                      3,
                      moment()
                        .add(3, "hours")
                        .format("YYYY-MM-DDTHH:mm:ss")
                    )
                  }
                  active={this.state.hour === 3}
                >
                  3 Hours
                </Button>
                <Button
                  color="dark"
                  onClick={() =>
                    this.setSleepTime(
                      4,
                      moment()
                        .add(4, "hours")
                        .format("YYYY-MM-DDTHH:mm:ss")
                    )
                  }
                  active={this.state.hour === 4}
                >
                  4 Hours
                </Button>
                <Button
                  color="dark"
                  onClick={() =>
                    this.setSleepTime(
                      5,
                      moment()
                        .add(5, "hours")
                        .format("YYYY-MM-DDTHH:mm:ss")
                    )
                  }
                  active={this.state.hour === 5}
                >
                  5 Hours
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <React.Fragment />
        )}
        {this.state.runStatus ? (
          <div className="row" style={{ "margin-top": "8%" }}>
            <div className="col-sm-12">
              <div id="container" style={{ "margin-top": "8%" }}></div>
            </div>
          </div>
        ) : (
          <React.Fragment />
        )}
        <div className="row" style={{ "margin-top": "8%" }}>
          {(this.state.ipAddress !== "" &&
            this.state.ipGood &&
            this.state.ipGood !== null) ||
          this.state.skipMethod === 1 ? (
            <div className="col-sm-12">
              <h3>
                <b>Run </b>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-speedometer"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z" />
                  <path
                    fill-rule="evenodd"
                    d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"
                  />
                </svg>
              </h3>
              {this.state.skipMethod === 0 ? (
                <p style={{ "margin-top": "2%" }}>
                  Using IP:{this.state.ipAddress}
                </p>
              ) : this.state.skipMethod === 1 ? (
                <p style={{ "margin-top": "2%" }}>
                  Using GPIO pins over UART: /dev/ttyACM0 9600
                </p>
              ) : (
                <React.Fragment />
              )}
              <button
                type="button"
                class="btn btn-outline-secondary"
                style={{ width: "100%" }}
                onClick={(e) => this.runSkipPi()}
              >
                {this.state.runStatus === false ? "Start!" : "STOP"}
              </button>
            </div>
          ) : (
            <React.Fragment />
          )}
        </div>
        <div
          className="row"
          style={{ "margin-top": "5%", borderBottom: " 2px solid white" }}
        >
          <div className="col-sm-12">
            <h3 onClick={this.statsClicked} style={{ cursor: "pointer" }}>
              <b>Stats </b>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-bar-chart"
                viewBox="0 0 16 16"
              >
                <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
              </svg>{" "}
              {!this.state.statsOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              )}
            </h3>
          </div>
        </div>
        {this.state.statsOpen ? (
          <React.Fragment>
            <div className="row" style={{ "margin-top": "2%" }}>
              <div
                className="col-sm-6 text-center"
                style={{ "margin-top": "5%" }}
              >
                <h5>
                  <b> Skips </b>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-file-slides"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5 4a.5.5 0 0 0-.496.438l-.5 4A.5.5 0 0 0 4.5 9h3v2.016c-.863.055-1.5.251-1.5.484 0 .276.895.5 2 .5s2-.224 2-.5c0-.233-.637-.429-1.5-.484V9h3a.5.5 0 0 0 .496-.562l-.5-4A.5.5 0 0 0 11 4H5zm2 3.78V5.22c0-.096.106-.156.19-.106l2.13 1.279a.125.125 0 0 1 0 .214l-2.13 1.28A.125.125 0 0 1 7 7.778z" />
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                  </svg>
                </h5>

                <div className="row" style={{ "margin-top": "5%" }}>
                  <div className="col-sm-12 text-center">
                    {this.state.skipCount}
                  </div>
                </div>
              </div>
              <div
                className="col-sm-6 text-center"
                style={{ "margin-top": "5%" }}
              >
                <h5>
                  <b>No Skips </b>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-file-easel"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.5 5a.5.5 0 1 0-1 0h-2A1.5 1.5 0 0 0 4 6.5v2A1.5 1.5 0 0 0 5.5 10h.473l-.447 1.342a.5.5 0 1 0 .948.316L7.027 10H7.5v1a.5.5 0 0 0 1 0v-1h.473l.553 1.658a.5.5 0 1 0 .948-.316L10.027 10h.473A1.5 1.5 0 0 0 12 8.5v-2A1.5 1.5 0 0 0 10.5 5h-2zM5 6.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-2z" />
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                  </svg>
                </h5>

                <div className="row" style={{ "margin-top": "5%" }}>
                  <div className="col-sm-12 text-center">
                    {this.state.noSkipCount}
                  </div>
                </div>
              </div>
            </div>

            <div className="row" style={{ "margin-top": "2%" }}>
              <div
                className="col-sm-6 text-center"
                style={{ "margin-top": "5%" }}
              >
                <h5>
                  <b>Seconds Watching Ads </b>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-stopwatch"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                    <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                  </svg>
                </h5>

                <div className="row" style={{ "margin-top": "5%" }}>
                  <div className="col-sm-12 text-center">
                    {this.state.skipCount * 5}
                  </div>
                </div>
              </div>
              <div
                className="col-sm-6 text-center"
                style={{ "margin-top": "5%" }}
              >
                <h5>
                  <b>Minutes Watching Ads </b>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-clock-history"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                  </svg>
                </h5>

                <div className="row" style={{ "margin-top": "5%" }}>
                  <div className="col-sm-12 text-center">
                    {((this.state.skipCount * 5) / 60).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className="row" style={{ "margin-top": "2%" }}>
              <div
                className="col-sm-6 text-center"
                style={{ "margin-top": "5%" }}
              >
                <h5>
                  <b>Minutes Running </b>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-lightning-charge"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41 4.157 8.5z" />
                  </svg>
                </h5>

                <div className="row" style={{ "margin-top": "5%" }}>
                  <div className="col-sm-12 text-center">
                    {(
                      (this.state.skipCount * 5 + this.state.noSkipCount * 5) /
                      60
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
              {this.state.skipCount !== 0 || this.state.noSkipCount !== 0 ? (
                <div
                  className="col-sm-6 text-center"
                  style={{ "margin-top": "5%" }}
                >
                  <h5>
                    <b>Ad Frequency </b>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-filter"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                    </svg>
                  </h5>

                  <div className="row" style={{ "margin-top": "5%" }}>
                    <div className="col-sm-12 text-center">
                      {isNaN(
                        (this.state.noSkipCount * 5) /
                          60 /
                          ((this.state.skipCount * 5) / 60)
                      )
                        ? 0
                        : (
                            (this.state.noSkipCount * 5) /
                            60 /
                            ((this.state.skipCount * 5) / 60)
                          ).toFixed(2)}{" "}
                      mins.
                    </div>
                  </div>
                </div>
              ) : (
                <React.Fragment />
              )}
            </div>
            {this.state.skipCount !== 0 || this.state.noSkipCount !== 0 ? (
              <div style={{ "margin-top": "8%" }}>
                <h5 className="text-center">
                  <b>Skip/NoSkip Graph</b>
                </h5>

                <VictoryPie
                  width={200}
                  height={200}
                  style={{
                    data: {
                      fillOpacity: 0.9,
                      stroke: "white",
                      strokeWidth: 1,
                    },
                    labels: {
                      fontSize: 6,
                      fill: "lightgrey",
                    },
                  }}
                  data={[
                    {
                      x:
                        "Skips " +
                        (
                          (this.state.skipCount /
                            (this.state.skipCount + this.state.noSkipCount)) *
                          100
                        ).toFixed(2) +
                        "%",
                      y: this.state.skipCount,
                    },
                    {
                      x:
                        "NoSkips " +
                        (
                          (this.state.noSkipCount /
                            (this.state.skipCount + this.state.noSkipCount)) *
                          100
                        ).toFixed(2) +
                        "%",
                      y: this.state.noSkipCount,
                    },
                  ]}
                  // theme={VictoryTheme.greyscale}
                />
              </div>
            ) : (
              <React.Fragment />
            )}
          </React.Fragment>
        ) : (
          <React.Fragment />
        )}
      </div>
    );
  }
}

export default Dashboard;
