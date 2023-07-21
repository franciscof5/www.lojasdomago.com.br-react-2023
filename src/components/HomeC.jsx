import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import anunciosListSample from "../anuncios_sample.json";
import axios from "axios";
import { Link } from "react-router-dom";

const API_anuncios = "http://api.lojasdomago.com.br";
const API_cripto = "https://criptoya.com/api/binance/btc/brl/1";

var BTC_ask = 145000;

export default class HomeC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anunciosListAPI: anunciosListSample.children,
      //anunciosListAPI: [children[{a,b}],],
      filtrandoAnuncioPorTitulo: null,
      filtrandoStatus: "all",
      filtrandoData: null
    };
  }

  componentDidMount() {
    console.log("componentDidMount()");
    this.getAnuncios();
    this.getBTC();
  }

  async getAnuncios() {
    await axios.get(API_anuncios + "/anuncios/").then( (response) => {
      var pars
      if (response.data) {
        pars = response.data
        //pars = JSON.stringify(response.data, null, 2)
        //pars = JSON.parse(pars)
        this.setState({ anunciosListAPI: pars.children})
      }
      
    }).catch(err=> console.log(err));
  }

  async getBTC() {
    await axios.get(API_cripto).then( (response) => {
      if(response.data) {
        console.log(response.data.ask)
        BTC_ask = response.data.ask;
      }
    })
  }

  editUser(e, id) {
    console.log("id", id);
  }

  handleSearch = (event) => {
    this.setState({ filtrandoAnuncioPorTitulo: event.target.value });
  };
  handleStatus = (event) => {
    this.setState({ filtrandoStatus: event.target.value });
  };
  handleData = (event) => {
    this.setState({ filtrandoData: event.target.value });
  };

  /*mapping = (node) => {
    return ( node.children !== undefined  ? 
      node.children.map(item => (
        <p>bbb{item.name}</p>
      ))
      :
      <p>{ node.name }</p> 
    )
  }*/

  render() {
    var anuncios = this.state.anunciosListAPI.filter( (data) => {
      if (this.state.filtrandoAnuncioPorTitulo == null) {
        return data;
      } else if (
        data.name
          .toLowerCase()
          .includes(this.state.filtrandoAnuncioPorTitulo.toLowerCase())
      ) {
        return data;
      }
      return null;
    });/**/
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
        </div>
        <div className="row my-4">
          <div>
            <Row xs={1} md={5} className="g-4">
            {
              anuncios.map(item => (
              <Col key={item.name}>
                <Card>
                  <Card.Img variant="top" src={API_anuncios + "/static" + item.path.replace("code/anuncios-controle","")} />
                  <Card.Body>
                    <Card.Title>{item.name.split('R$')[0]}</Card.Title>
                    <Card.Text>
                    R$ { item.name.slice(0,-4).split('R$')[1] },00 <br />
                    BTC <small>{ (item.name.slice(0,-4).split('R$')[1]/BTC_ask).toFixed(5) } </small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              )

              )
            }
            </Row>
          </div>
        </div>
      </div>
   );
    /*var users = this.state.anunciosListAPI.filter((data) => {
      if (this.state.filtrandoAnuncioPorTitulo == null) {
        return data;
      } else if (
        data.name
          .toLowerCase()
          .includes(this.state.filtrandoAnuncioPorTitulo.toLowerCase())
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
