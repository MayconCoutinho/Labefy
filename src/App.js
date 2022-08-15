import React from 'react';
import './App.css';
import Home from './components/home/index'
import Cadastro from './components/cadastro/index'


export default class App extends React.Component{

  state = {
    telaAtual : "home"
  }

  mudarDePage = () => {
    switch (this.state.telaAtual){

      case "home":
        return <Home irParaCadastro={this.irParaCadastro}/>
      case "cadastro":
        return <Cadastro irParaHome={this.irParaHome}/>
      default:
        return <div> Erro! Essa pagina não existe! </div>
    }
  }

  irParaCadastro = () => {
    this.setState({telaAtual: "cadastro"})
  }

  irParaHome = () => {
    this.setState({telaAtual: "home"})
  }

  render () {  
    return (
    <div className="App">
        {this.mudarDePage()}
        
    </div>
  
  )}}


