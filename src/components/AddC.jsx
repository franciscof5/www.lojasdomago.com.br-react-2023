import React from "react";
import Alert from "react-bootstrap/Alert";
import { useForm } from "react-hook-form";
import axios from "axios";
const APIbaseURL = "https://mack-webmobile.vercel.app/api";

export default function FormValidation() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  var userOk = false;

  const onSubmit = (data) => {
    console.log("data2:", data);
    if (data.status === true) {
      data.status = "Active";
    } else {
      data.status = "Inactive";
    }
    data.avatar =
      "https://randomuser.me/api/portraits/women/" +
      Math.ceil(Math.random() * 100) +
      ".jpg";
    console.log(data);

    axios
      .post(APIbaseURL + "/users", data)
      .then(function (res) {
        console.log(res);
        if (res.statusText === "OK") {
          this.userOk = true;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div style={!userOk ? { display: "none" } : {}}>
        <Alert variant="success" key="success">
          Usuário adicionado com sucesso
        </Alert>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <label>Nome</label>
          <input
            placeholder="First Name"
            type="text"
            {...register("name", { required: true, maxLength: 20 })}
          />
        </Form.Field>
        {errors.firstName && <p>Please check the First Name</p>}
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email"
            type="email"
            {...register("email", {
              required: true
              //pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })}
          />
        </Form.Field>
        {errors.email && <p>Please check the Email</p>}
        <Form.Field>
          <label>Salário</label>
          <Input labelPosition="right" type="text" placeholder="Amount">
            <Label basic>$</Label>
            <input
              placeholder="Sallary"
              type="text"
              {...register("salary", {
                required: true
              })}
            />
            <Label>.00</Label>
          </Input>
          {errors.salary && <p>Please check the Salary</p>}
        </Form.Field>

        <Form.Field>
          <label>Data</label>
          <input
            placeholder="Nascimento"
            type="date"
            {...register("date", { required: true })}
          />
        </Form.Field>
        {errors.date && <p>Please check the Date</p>}

        <Form.Field>
          <label>Ativo</label>
          <input
            placeholder="Status"
            type="checkbox"
            value="Active"
            {...register("status")}
          />
        </Form.Field>

        <Button type="submit">Adicionar funcionário</Button>
      </Form>
    </div>
  );
}
/*import React, { Component } from "react";
import axios from "axios";
const APIbaseURL = "https://mack-webmobile.vercel.app/api";

export default class HomeC extends Component {
  addUser() {
    const user = {
      name: "2FaFa de BeBe",
      avatar:
        "https://randomuser.me/api/portraits/women/" +
        Math.ceil(Math.random() * 100) +
        ".jpg",
      email: "daszj@gmail.com",
      salary: 122222,
      date: "2019-05-14",
      status: "Active",
      __v: 0
    };
    console.log("data");
    axios
      .post(APIbaseURL + "/users", user)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <h2>Adiciona</h2>
        <form>
          <div>
            <input type="text" name="firstname" placeholder="FirstName" />
          </div>
          <div>
            <input type="text" name="lastname" placeholder="LastName" />
          </div>
          <div>
            <input type="text" name="email" placeholder="Email" />
          </div>
          <div>
            <input type="text" name="salary" placeholder="Salary" />
          </div>
          <div>
            <input type="date" name="date" placeholder="Salary" />
          </div>
          <div>
            <div>
              <input
                type="radio"
                id="radioDefault1"
                name="status"
                value="Active"
              />
              <label htmlFor="radioDefault1">Active</label>
            </div>
            <div>
              <input
                type="radio"
                id="radioDefault2"
                name="status"
                value="Inactive"
              />
              <label htmlFor="radioDefault2">Inactive</label>
            </div>
          </div>
        </form>
        <button onClick={this.addUser}>
          Add{" "}
          <span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
            </svg>
          </span>
        </button>
      </div>
    );
  }
}
*/
