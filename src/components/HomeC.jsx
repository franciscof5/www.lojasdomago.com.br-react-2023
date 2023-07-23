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
      anunciosListAPI: anunciosListSample.pictures,
      //anunciosListAPI: [children[{a,b}],],
      filtrandoAnuncioPorTitulo: null,
      filtrandoAnuncioPorCategoria: "casa",
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
        this.setState({ anunciosListAPI: pars.pictures})
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
  handleCategoria = (event) => {
    this.setState({ filtrandoAnuncioPorCategoria: event.target.value });
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
    }).filter( (data) => {
      if (this.state.filtrandoAnuncioPorCategoria.toLowerCase() === "todos") {
        //console.log("Todos");
        return data;
      } else if (
        data.cat.toLowerCase() === "casa" &&
        this.state.filtrandoAnuncioPorCategoria.toLowerCase() === "casa"
      ) {
        console.log(this.state.filtrandoAnuncioPorCategoria);
        return data;
      } else if (
        data.cat.toLowerCase() === "eletronicos" &&
        this.state.filtrandoAnuncioPorCategoria.toLowerCase() === "eletronicos"
      ) {
        console.log(this.state.filtrandoAnuncioPorCategoria);
        return data;
      } else if (
        data.cat.toLowerCase() === "esportes" &&
        this.state.filtrandoAnuncioPorCategoria.toLowerCase() === "esportes"
      ) {
        console.log(this.state.filtrandoAnuncioPorCategoria);
        return data;
      } else if (
        data.cat.toLowerCase() === "imoveis" &&
        this.state.filtrandoAnuncioPorCategoria.toLowerCase() === "imoveis"
      ) {
        console.log(this.state.filtrandoAnuncioPorCategoria);
        return data;
      } else if (
        data.cat.toLowerCase() === "musica" &&
        this.state.filtrandoAnuncioPorCategoria.toLowerCase() === "musica"
      ) {
        console.log(this.state.filtrandoAnuncioPorCategoria);
        return data;
      } else if (
        data.cat.toLowerCase() === "vagas" &&
        this.state.filtrandoAnuncioPorCategoria.toLowerCase() === "vagas"
      ) {
        console.log(this.state.filtrandoAnuncioPorCategoria);
        return data;
      } else if (
        data.cat.toLowerCase() === "veiculos" &&
        this.state.filtrandoAnuncioPorCategoria.toLowerCase() === "veiculos"
      ) {
        console.log(this.state.filtrandoAnuncioPorCategoria);
        return data;
      } 
      
      return null;
    });
    var img_nex;
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
            <select onChange={this.handleCategoria} className="form-control">
              <option value="todos">Todos</option>
              <option value="casa">Casa</option>
              <option value="eletronicos">Eletrônicos</option>
              <option value="esportes">Esportes</option>
              <option value="imoveis">Imóveis</option>
              <option value="musica">Música</option>
              <option value="veiculos">Veículos</option>
            </select>
          </div>
        </div>
        <div className="row my-4">
          <div>
            <Row xs={1} md={4} className="g-4">
            {
              anuncios
              //.sort((a, b) => a.price > b.price ? 1 : -1)
              .map(item => (
              <Col key={item.name}>
                <Card>
                  <span next={ item.pictures ? 
                      item.pictures[0] ?
                      this.img_nex = item.pictures[0].path
                      : null : null }></span>
                  <Card.Img variant="top" src={API_anuncios + "/static" + "/" + this.img_nex.replace("/code/anuncios-controle","") } />
                  <Card.Body>
                    <Card.Title>{ item.name }</Card.Title>
                    <Card.Text>
                    Cat: { item.cat } <br />
                    R$ { item.price },00 <br />
                    BTC <small>{ (item.price/BTC_ask).toFixed(5) } </small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              ) )
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
        if (this.state.filtrandoAnuncioPorCategoria.toLowerCase() === "all") {
          //console.log("Todos");
          return data;
        } else if (
          data.status.toLowerCase() === "active" &&
          this.state.filtrandoAnuncioPorCategoria.toLowerCase() === "active"
        ) {
          console.log(this.state.filtrandoAnuncioPorCategoria);
          return data;
        } else if (
          data.status.toLowerCase() === "inactive" &&
          this.state.filtrandoAnuncioPorCategoria.toLowerCase() === "inactive"
        ) {
          console.log(this.state.filtrandoAnuncioPorCategoria);
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
