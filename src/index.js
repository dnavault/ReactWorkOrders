import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

const url = "https://api.hatchways.io/assessment/work_orders";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      listWorkOrders: [],
      listEmployees: []
    };
  }

  handleGetWorkOrders = (e) => {
    console.log("handleGet");
    axios
      .get(url)
      .then((res) => {
        this.setState({ listWorkOrders: res.data.orders });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleGetEmployees = () => {
    console.log("Emp");
  };

  componentDidMount() {
    this.handleGetWorkOrders();
    this.handleGetEmployees();
  }

  render() {
    const workTest = this.state.listWorkOrders;
    let employeeList = [];

    workTest.map((workorder, index) => {
      if (employeeList.includes(workorder.id) === false) {
        employeeList.push(workorder.workerId);
      }
    });
    console.log("New Emp", employeeList);

    return (
      <div>
        <div>
          {this.state.listWorkOrders.map((workorder, index) => {
            return (
              <div key={index}>
                <p>{workorder.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
