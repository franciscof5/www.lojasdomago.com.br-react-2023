import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useForm } from "react-hook-form";
import axios from "axios";
const APIbaseURL = "https://mack-webmobile.vercel.app/api";

export default class EditC extends Component {
  //console.log(data);

  constructor(props) {
    super(props);
    console.log("dataCOM", props.dataP);
    this.state = {
      user: props.dataP
    };
  }
  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Nome</label>
            <input
              placeholder="First Name"
              type="text"
              value={this.state.user.name}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email"
              type="email"
              value={this.state.user.email}
            />
          </Form.Field>
          <Form.Field>
            <label>Salário</label>
            <Input
              labelPosition="right"
              type="text"
              placeholder="Amount"
              value={this.state.user.salary}
            >
              <Label basic>$</Label>
              <input placeholder="Sallary" type="text" />
              <Label>.00</Label>
            </Input>
          </Form.Field>

          <Form.Field>
            <label>Data</label>
            <input
              placeholder="Nascimento"
              type="date"
              value={this.state.user.date}
            />
          </Form.Field>

          <Form.Field>
            <label>Ativo</label>
            <input
              placeholder="Status"
              type="checkbox"
              value="Active"
              checked={this.state.user.status === "Active" ? true : false}
            />
          </Form.Field>
        </Form>
      </div>
    );
  }
}
