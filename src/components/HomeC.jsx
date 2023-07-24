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

  ativarCategoria(qual) {
    //this.state.filtrandoAnuncioPorCategoria = qual
    this.setState({ filtrandoAnuncioPorCategoria: qual });
    //this.handleCategoria()
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
      }  else if (
        data.cat.toLowerCase() === "moda" &&
        this.state.filtrandoAnuncioPorCategoria.toLowerCase() === "moda"
      ) {
        console.log(this.state.filtrandoAnuncioPorCategoria);
        return data;
      } 
      
      return null;
    });
    var img_nex;
    return (
      <div>
        <div className="header-filtro">
          <div className="row my-2">
            <div className="col-md-10 offset-1 mt-1 mb-2 flex all-center">
              <input
                type="text"
                onChange={this.handleSearch}
                placeholder="Buscar produto"
                className="form-control"
              />
              <svg className="float-end" style={{top:"-30px", position: "relative", right:"10px"}} viewBox="0 0 24 24" width="24" height="24" size="24" color="currentColor"><path fill="currentColor" fill-rule="evenodd" d="M16.84 15.78l4.69 4.69a.75.75 0 01-1.06 1.06l-4.69-4.69a8.25 8.25 0 111.06-1.06zm-1.51-.564a6.75 6.75 0 10-.113.113.759.759 0 01.112-.113z"></path></svg>
            </div>
          </div>
          <div className="row category-stripe">
            <ul className="list-unstyled mb-0 list-inline category-stripe pb-3 category-stripe-margin-bottom">
                <li className="list-inline-item all-categories      "><a onClick={() => this.ativarCategoria('todos')}>      <span className="icon-background" style={ { backgroundColor: this.state.filtrandoAnuncioPorCategoria==="todos" ? "#FFFEAA" : "" } }><svg viewBox="0 0 24 24" fill="none" width="32" height="32" size="32" color="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.714 9.507l-7.702 1.358a1.093 1.093 0 01-1.265-.887L8.39 2.277c-.169-.958.905-1.642 1.703-1.085l9.06 6.343c.797.559.521 1.803-.438 1.972zM5.625 21.879a5.375 5.375 0 100-10.75 5.375 5.375 0 000 10.75zm0-9.75a4.375 4.375 0 110 8.75 4.375 4.375 0 010-8.75zm7.813 9.405a1.25 1.25 0 01-1.014-1.449l1.304-7.393a1.25 1.25 0 011.448-1.013l7.392 1.303c.68.12 1.135.77 1.014 1.448l-1.303 7.393a1.251 1.251 0 01-1.448 1.014l-7.393-1.303zm7.856.115a.25.25 0 01-.29.203l-7.392-1.303a.25.25 0 01-.203-.29l1.303-7.393a.25.25 0 01.29-.203l7.393 1.304a.25.25 0 01.202.288l-1.303 7.394zM18.578 8.354a.093.093 0 01-.037.168L10.839 9.88a.093.093 0 01-.107-.076L9.374 2.103a.093.093 0 01.145-.092l9.059 6.343z" fill="currentColor"></path></svg></span><small>Tudo</small></a></li>
                <li className="list-inline-item campaign-item-margin"><a onClick={() => this.ativarCategoria('veiculos')}>   <span className="icon-background" style={ { backgroundColor: this.state.filtrandoAnuncioPorCategoria==="veiculos" ? "#FFFEAA" : "" } }><svg viewBox="0 0 24 24" fill="none" width="32" height="32" size="32" color="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.384 10h-.86l-3.9-4.552a2.001 2.001 0 00-1.52-.698h-6.04a3.5 3.5 0 00-3.365 2.539L3.924 10a3.5 3.5 0 00-3.448 3.066l-.21 1.686A2 2 0 002.25 17h.84a2.751 2.751 0 005.41 0h6.59a2.751 2.751 0 005.41 0h.627a2 2 0 001.941-2.481l-.743-3A2 2 0 0020.384 10zM5.66 7.563L4.964 10h6.252l.747-4.25h-3.9A2.5 2.5 0 005.66 7.563zm7.318-1.813L12.231 10h5.977l-3.344-3.901a1.001 1.001 0 00-.76-.349h-1.126zM8.5 16h6.591a2.751 2.751 0 015.41 0h.627a1 1 0 00.97-1.24l-.743-3a1 1 0 00-.97-.76H3.95a2.5 2.5 0 00-2.481 2.19l-.211 1.686A1 1 0 002.25 16h.84a2.751 2.751 0 015.41 0zm-2.704 2.25a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zm12 0a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5z" fill="currentColor"></path></svg></span><small>Veículos</small></a></li>
                <li className="list-inline-item campaign-item-margin"><a onClick={() => this.ativarCategoria('casa')}>       <span className="icon-background" style={ { backgroundColor: this.state.filtrandoAnuncioPorCategoria==="casa" ? "#FFFEAA" : "" } }><svg viewBox="0 0 24 25" fill="none" width="32" height="32" size="32" color="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.318 8.748a2 2 0 001.352 3.024l1.347.237v4.153h1v-3.977l2 .353v7.624h-1.75a2 2 0 00-2 2v2h11.5v-2a2 2 0 00-2-2h-1.75v-6.919l3.54.624a2 2 0 002.305-2.378L18.043 2.79a2 2 0 00-1.61-1.56L11.047.28A2 2 0 009 1.197L4.318 8.748zm8.699 11.414v-7.095l-2-.353v7.448h2zm5.866-8.468a1 1 0 01-1.153 1.189L5.844 10.787a1 1 0 01-.676-1.512l4.683-7.552a1 1 0 011.023-.457l5.386.95a1 1 0 01.805.78l1.818 8.698zM7.267 23.162v-1a1 1 0 011-1h7.5a1 1 0 011 1v1h-9.5z" fill="currentColor"></path></svg></span><small>Mobília</small></a></li>
                <li className="list-inline-item campaign-item-margin"><a onClick={() => this.ativarCategoria('eletronicos')}><span className="icon-background" style={ { backgroundColor: this.state.filtrandoAnuncioPorCategoria==="eletronicos" ? "#FFFEAA" : "" } }><svg viewBox="0 0 24 24" fill="none" width="32" height="32" size="32" color="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.946.487a2.61 2.61 0 00-3.024 2.117l-.28 1.584-2.37 13.45-.28 1.584a2.609 2.609 0 002.117 3.023l8.31 1.465a2.61 2.61 0 003.022-2.117l2.65-15.033.28-1.585a2.609 2.609 0 00-2.117-3.023L9.946.487zm9.161 5.9l.28-1.585a1.609 1.609 0 00-1.306-1.864L9.77 1.472a1.61 1.61 0 00-1.864 1.306l-.28 1.584 11.48 2.024zM5.257 17.81l11.479 2.024-.28 1.585a1.61 1.61 0 01-1.864 1.306l-8.31-1.465a1.61 1.61 0 01-1.305-1.864l.28-1.586zm11.652 1.04L5.43 16.825l2.025-11.48 11.48 2.025-2.025 11.48zm-6.314 2.25a.704.704 0 10.242-1.386.704.704 0 00-.242 1.386z" fill="currentColor"></path></svg></span><small>Eletrônicos</small></a></li>
                <li className="list-inline-item campaign-item-margin"><a onClick={() => this.ativarCategoria('musica')}>     <span className="icon-background" style={ { backgroundColor: this.state.filtrandoAnuncioPorCategoria==="musica" ? "#FFFEAA" : "" } }><svg viewBox="0 0 24 24" fill="none" width="32" height="32" size="32" color="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.034 9.153l.437-.077v7.226a3.5 3.5 0 101 2.45V8.9l9.5-1.676v7.578a3.5 3.5 0 101 2.45V6.826a2 2 0 00.765-1.944l-.261-1.477a2 2 0 00-2.318-1.622L7.08 3.737a2 2 0 00-1.622 2.317l.26 1.476a2 2 0 002.317 1.623zm10.937 8.098a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0zm-13-1a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm13.78-11.195a1 1 0 01-.812 1.158L7.86 8.167a1 1 0 01-1.158-.811l-.26-1.477a1 1 0 01.81-1.159l11.08-1.953a1 1 0 011.158.811l.261 1.478z" fill="currentColor"></path></svg></span><small>Música</small></a></li>
                <li className="list-inline-item campaign-item-margin"><a onClick={() => this.ativarCategoria('esportes')}>   <span className="icon-background" style={ { backgroundColor: this.state.filtrandoAnuncioPorCategoria==="esportes" ? "#FFFEAA" : "" } }><svg viewBox="0 0 24 24" fill="none" width="32" height="32" size="32" color="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.588 10.312C2.642 4.33 8.348.333 14.331 1.39c5.983 1.055 9.977 6.76 8.922 12.743-1.054 5.982-6.76 9.977-12.742 8.922C4.528 22 .533 16.294 1.588 10.312zm8.126 11.536a9.975 9.975 0 01-5.826-4.412 6.983 6.983 0 014.19-1.525 16.91 16.91 0 001.636 5.937zM2.498 10.98a9.947 9.947 0 00.905 5.567 7.981 7.981 0 014.618-1.634c-.025-.97.032-1.95.175-2.928L2.498 10.98zm8.48 11.137a15.93 15.93 0 01-1.892-6.157 7.004 7.004 0 016.085 5.878 9.95 9.95 0 01-4.194.279zM9.64 15.03a8.004 8.004 0 016.49 6.478 9.994 9.994 0 006.04-7.06L9.182 12.157a16.053 16.053 0 00-.16 2.788c.206.02.412.049.618.085zm-.285-3.858l12.988 2.29a9.995 9.995 0 00-3.26-8.701 8.005 8.005 0 01-8.923 3.736 16.048 16.048 0 00-.805 2.675zm-.148-2.985A17.054 17.054 0 008.37 11L2.672 9.994a9.948 9.948 0 012.754-4.921 7.983 7.983 0 003.781 3.115zm.394-.92a6.985 6.985 0 01-3.415-2.866 9.977 9.977 0 016.986-2.154 16.91 16.91 0 00-3.57 5.02zm.965.3a15.93 15.93 0 013.884-5.139 9.95 9.95 0 013.844 1.696 7.004 7.004 0 01-7.728 3.443z" fill="currentColor"></path></svg></span><small>Esportes</small></a></li>
                <li className="list-inline-item campaign-item-margin"><a onClick={() => this.ativarCategoria('moda')}>       <span className="icon-background" style={ { backgroundColor: this.state.filtrandoAnuncioPorCategoria==="moda" ? "#FFFEAA" : "" } }><svg viewBox="0 0 24 24" fill="none" width="32" height="32" size="32" color="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.1 3.51a1.75 1.75 0 00-1.833 1.747h-1a2.749 2.749 0 012.88-2.746 2.767 2.767 0 012.617 2.617 2.75 2.75 0 01-1.646 2.65 1 1 0 00-.601.916v.639c.436.118.835.384 1.115.783l6.74 9.624c1.02 1.46-.231 3.426-1.986 3.117L2.022 19.97c-1.754-.31-2.259-2.586-.8-3.607l9.625-6.739c.209-.146.436-.247.67-.305v-.626a2 2 0 011.2-1.832 1.75 1.75 0 001.048-1.688A1.767 1.767 0 0012.1 3.51zM1.796 17.183c-.73.51-.477 1.649.4 1.803l16.363 2.886c.878.155 1.504-.828.994-1.558l-6.74-9.624a1 1 0 00-1.392-.246l-9.625 6.739z" fill="currentColor"></path></svg></span><small>Moda</small></a></li>
                <li className="list-inline-item campaign-item-margin"><a onClick={() => this.ativarCategoria('imoveis')}>    <span className="icon-background" style={ { backgroundColor: this.state.filtrandoAnuncioPorCategoria==="imoveis" ? "#FFFEAA" : "" } }><svg viewBox="0 0 24 24" fill="none" width="32" height="32" size="32" color="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.011 20.427v-7.608l-.385-.069c-1.86-.328-2.394-2.74-.847-3.822l9.07-6.351a2.12 2.12 0 012.951.52l6.351 9.07c.868 1.24.184 2.884-1.15 3.258v5.002c0 1.002-.776 1.825-1.749 1.825H5.761c-.973 0-1.75-.823-1.75-1.825zm14.99-5.904l.478-.021c.856-.037 1.362-1.033.853-1.76L13.98 3.67a1.12 1.12 0 00-1.559-.275l-9.07 6.351c-.817.572-.534 1.845.448 2.019l1.211.213v8.448c0 .462.343.825.75.825h1.536l1.28-7.242a2 2 0 012.316-1.623l2.955.522a2 2 0 011.622 2.317l-1.064 6.025h3.846c.407 0 .749-.362.749-.824v-5.904zm-4.516.53l-1.094 6.197H8.313l1.249-7.067a1 1 0 011.158-.81l2.955.52a1 1 0 01.81 1.16z" fill="currentColor"></path></svg></span><small>Imóveis</small></a></li>
                
                <li className="list-inline-item campaign-item-margin"><a onClick={() => this.ativarCategoria('vagas')}>      <span className="icon-background" style={ { backgroundColor: this.state.filtrandoAnuncioPorCategoria==="vagas" ? "#FFFEAA" : "" } }><svg viewBox="0 0 24 24" fill="none" width="32" height="32" size="32" color="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.978.264l3.85.678-.932 5.283-3.85-.68.932-5.281zM7.794 1.742l3.581.631-.174.985-3.58-.631a.954.954 0 00-1.106.774L3.736 19.258a.954.954 0 00.774 1.106l11.46 2.02a.956.956 0 001.106-.774l2.773-15.757a.955.955 0 00-.774-1.106l-3.576-.631.174-.985 3.576.63a1.955 1.955 0 011.585 2.265L18.06 21.784a1.956 1.956 0 01-2.265 1.586l-11.46-2.021a1.954 1.954 0 01-1.584-2.265L5.53 3.327a1.954 1.954 0 012.264-1.585zm6.29 3.325l-1.88-.332.585-3.312 1.88.331-.584 3.313zm.461 12.823v1H8.727v-1h5.818zm-.59-7.444c0 .381-.092.74-.255 1.058a2.571 2.571 0 012.082 2.524v1.096c0 .706-.571 1.277-1.277 1.277H8.776A1.276 1.276 0 017.5 15.124v-1.096a2.57 2.57 0 012.073-2.523 2.318 2.318 0 114.381-1.059zm-2.319 2.319c-.42 0-.814-.112-1.154-.308h-.412a1.57 1.57 0 00-1.57 1.57v1.097c0 .153.124.277.276.277h5.73a.277.277 0 00.276-.277v-1.096a1.57 1.57 0 00-1.57-1.57h-.42c-.34.195-.735.307-1.156.307zm0-1a1.318 1.318 0 100-2.636 1.318 1.318 0 000 2.636z" fill="currentColor"></path></svg></span><small>Vagas de emprego</small></a></li>
                <li className="list-inline-item campaign-item-margin"><a onClick={() => this.ativarCategoria('servicos')}>   <span className="icon-background" style={ { backgroundColor: this.state.filtrandoAnuncioPorCategoria==="servicos" ? "#FFFEAA" : "" } }><svg viewBox="0 0 24 24" fill="none" width="32" height="32" size="32" color="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.33 7.175a2 2 0 01-1.623-2.317l.521-2.955A2 2 0 016.545.28L19.84 2.625a2 2 0 011.622 2.316l-.174.986.247.043a2 2 0 011.622 2.316l-.392 2.223a1.999 1.999 0 01-2.317 1.622l-7.387-1.302a.998.998 0 00-1.157.811l-.174.985.246.044a1.999 1.999 0 011.622 2.316l-1.173 6.654a2.001 2.001 0 01-2.317 1.623l-1.477-.26a2 2 0 01-1.622-2.318l1.173-6.654a2 2 0 012.317-1.622l.246.043.174-.984a1.998 1.998 0 012.316-1.622l7.387 1.302a.999.999 0 001.158-.811l.392-2.223a1 1 0 00-.811-1.158l-.246-.044-.174.985a2 2 0 01-2.317 1.622L5.329 7.175zm13.468 1.36a1 1 0 001.158-.812l.521-2.955a1 1 0 00-.81-1.158L6.371 1.266a1 1 0 00-1.16.81l-.52 2.956a1 1 0 00.811 1.158l13.295 2.344zm-7.357 12.93l1.172-6.654a1 1 0 00-.81-1.158l-1.478-.26a1 1 0 00-1.158.81l-1.173 6.655a1.001 1.001 0 00.81 1.159l1.478.26a1.001 1.001 0 001.159-.812z" fill="currentColor"></path></svg></span><small>Serviços</small></a></li>
                <li className="list-inline-item campaign-item-margin"><a onClick={() => this.ativarCategoria('agro')}>       <span className="icon-background" style={ { backgroundColor: this.state.filtrandoAnuncioPorCategoria==="agro" ? "#FFFEAA" : "" } }><svg viewBox="0 0 24 24" fill="none" width="32" height="32" size="32" color="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.997 8.507l.302-1.712a2.001 2.001 0 00-1.622-2.317l-7.06-1.245A1.999 1.999 0 002.3 4.856l-1.245 7.06a2.05 2.05 0 00-.02.137 4.625 4.625 0 108.171 4.204h6.046a3.125 3.125 0 006.245-.003 2 2 0 001.835-2.43l-.833-3.75a2 2 0 00-1.953-1.567h-2.046V6.758a1 1 0 011-1h.75v-1h-.75a2 2 0 00-2 2v1.75h-4.504zM3.285 5.03l-1.02 5.785a4.625 4.625 0 017.194 4.443h5.916a3.126 3.126 0 016.002 0h.004a1 1 0 00.976-1.217l-.833-3.75a1 1 0 00-.977-.783h-8.742l.104-.587.406-2.298a1.001 1.001 0 00-.812-1.16l-7.06-1.244a.999.999 0 00-1.158.811zm15.09 13.228a2.124 2.124 0 10.002-4.249 2.124 2.124 0 00-.001 4.25zm-13.5 0a3.625 3.625 0 10.002-7.249 3.625 3.625 0 00-.001 7.25zm1.126-3.625a1.125 1.125 0 10-2.25 0 1.125 1.125 0 002.25 0z" fill="currentColor"></path></svg></span><small>Agro e indústria</small></a></li>
            </ul>
          </div>
        </div>
        <div className="row my-4 produtos">
          <div className=" ">
            <Row xs={2} md={6} lg={10} className="g-8">
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
                    <Card.Text>{ item.name }</Card.Text>
                    <Card.Title>
                    R$ { item.price },00 <br />
                    BTC <small>{ (item.price/BTC_ask).toFixed(5) } </small>
                    </Card.Title>
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
    
  }
}
