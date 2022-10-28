import { Component } from "react";
import Popup from "../models/index";
import "./index.css";
import { Link } from "react-router-dom";
import CardView from "../card/index";
import { Button } from "react-bootstrap";

class Records extends Component {
  state = {
    data: [],
  };

  loadItems = async () => {
    const apiUrl = "http://localhost:3000/";
    const options = {
      method: "GET",
    };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    this.setState({ data: data });
  };

  componentDidMount = async () => {
    this.loadItems();
  };

  render() {
    const { data } = this.state;
    return (
      <div className="food-container">
        <div className="head-container">
          <h1 className="head1">Records</h1>
          <div>
            <Link to="/multi">
              <Button className="multi-button">mutli image uploading</Button>
            </Link>

            <Popup />
          </div>
        </div>
        <div className="body-container">
          <h1>These are the records</h1>
          <div className="card-container">
            <ul className="card-ul">
              {data.map((each) => {
                return (
                  <li key={each.id} className="card-li">
                    <CardView props={each} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Records;
