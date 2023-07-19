import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import anunciosListSample from "../users.json";
import axios from "axios";
import { Link } from "react-router-dom";
const APIbaseURL = "http://api.lojasdomago.com.br";

export default class HomeC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anunciosListAPI: anunciosListSample,
      filtrandoUsuarios: null,
      filtrandoStatus: "all",
      filtrandoData: null
    };
  }

  componentDidMount() {
    console.log("componentDidMount()");
    this.getUsers();
  }

  async getUsers() {
    await axios.get(APIbaseURL + "/anuncios/").then((response) => {
      var pars
      if (response.data) {
        //console.log("response.data OK", response.data)
        pars = response.data
        pars = JSON.stringify(response.data, null, 2)
        //console.log("parsed", pars)
        pars = JSON.parse(pars)
        console.log("JSON.parse: ", pars)
        this.setState({ anunciosListAPI:  pars})
      }
      
    }).catch(err=> console.log(err));
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

  mapping = (node) => {
    return ( node.children !== undefined  ? 
      node.children.map(item => (
        <p>bbb{item.name}</p>
      ))
      :
      <p>{ node.name }</p> 
    )
    
  }

  render() {
    var anuncios = this.state.anunciosListAPI;
    return (
      <div>
      {
        anuncios.children.map(item => (
         <div  key={item.name}>
          <h2>
            {item.name}
          </h2>
          { ( item.children !== undefined ) ? 
            <span>
              { item.children.map(item2 => (
                ( item2.children !== undefined ) ? 
                  <span>
                    { item2.children.map(item3 => (
                      <p>
                        { item3.name } <br />
                        { item3.children !== undefined ? 
                            item3.children[1] !== undefined ? 
                              <img width="300" src={"http://api.lojasdomago.com.br/static" + item3.children[1].path.replace("code/anuncios-controle","")} />
                            : null
                          : null }  <br />
                      </p>
                    ) ) }
                  </span> 
                  :  null 
                
              ) ) }
            </span> 
            :  null 
          }
          
          
         </div>
        )

        )
      }
      </div>
   );
    /*var users = this.state.anunciosListAPI.filter((data) => {
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
         {anuncios}
        </div>
      </div>
    );*/
  }
}
