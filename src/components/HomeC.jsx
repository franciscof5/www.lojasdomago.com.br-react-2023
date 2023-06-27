import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import usersListSample from "../users.json";
import axios from "axios";
import { Link } from "react-router-dom";
const APIbaseURL = "https://mack-webmobile.vercel.app/api";

export default class HomeC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersListAPI: usersListSample,
      filtrandoUsuarios: null,
      filtrandoStatus: "all",
      filtrandoData: null
    };
  }

  componentDidMount() {
    this.getUsers();
  }
  getUsers() {
    axios.get(APIbaseURL + "/users").then((response) => {
      if (response.data) this.setState({ usersListAPI: response.data });
      //console.log(response.data);
    });
  }

  editUser(e, id) {
    console.log("id", id);
  }

  handleSearch = (event) => {
    this.setState({ filtrandoUsuarios: event.target.value });
  };
  handleStatus = (event) => {
    this.setState({ filtrandoStatus: event.target.value });
  };
  handleData = (event) => {
    this.setState({ filtrandoData: event.target.value });
  };

  render() {
    var users = this.state.usersListAPI.filter((data) => {
      if (this.state.filtrandoUsuarios == null) {
        return data;
      } else if (
        data.name
          .toLowerCase()
          .includes(this.state.filtrandoUsuarios.toLowerCase())
      ) {
        return data;
      }
      return null;
    });
    users = users
      .filter((data) => {
        if (this.state.filtrandoStatus.toLowerCase() === "all") {
          //console.log("Todos");
          return data;
        } else if (
          data.status.toLowerCase() === "active" &&
          this.state.filtrandoStatus.toLowerCase() === "active"
        ) {
          console.log(this.state.filtrandoStatus);
          return data;
        } else if (
          data.status.toLowerCase() === "inactive" &&
          this.state.filtrandoStatus.toLowerCase() === "inactive"
        ) {
          console.log(this.state.filtrandoStatus);
          return data;
        }
        return null;
      })
      .filter((data) => {
        if (this.state.filtrandoData == null) {
          //console.log("Todos");
          return data;
        } else if (data.date > this.state.filtrandoData) {
          console.log(this.state.filtrandoData);
          return data;
        }
        return null;
      });
    return (
      <div>
        <div className="row my-2">
          <div className="col-md-6 flex all-center">
            <i className="i fa fa-search table-search-icon" />
            <input
              type="text"
              onChange={this.handleSearch}
              placeholder="Filtrar por nome"
              className="form-control"
            />
          </div>
          <div className="col-md-6 flex flex-end">
            <select onChange={this.handleStatus} className="form-control">
              <option value="all">Todos</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>
          <div className="col-md-6 flex all-center">
            <input
              type="date"
              onChange={this.handleData}
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <Row xs={1} md={5} className="g-4">
            {users.map((user) => (
              <Col key={user._id}>
                <Link to="/edit" state={user}>
                  <Card
                    border={user.status === "Inactive" ? "danger" : ""}
                    bg={user.status === "Inactive" ? "danger" : ""}
                  >
                    <Card.Img variant="top" src={user.avatar} />
                    <Card.Body>
                      <Card.Title>{user.name}</Card.Title>
                      <Card.Text>
                        {user.status} {user.date}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
}
