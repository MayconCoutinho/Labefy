import React from 'react';
import './index.css';
import axios from "axios"

export default class Cadastro extends React.Component {

    state = {
        name: ""
    }

    handleNome = (event) => {
        this.setState({name: event.target.value})
    }


    criarPlaylist = () => {
        const url = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists"

        const body = {
            name: this.state.name,
        }

        axios.post(url,body, {
            headers: {
                Authorization: "maycon-coutinho-freire"
                }
            }
        ).then((res) => {
            alert("Playlist Criada, com sucesso!")
            this.setState({name:""})
        }).catch((err) => {
            alert(err.response.data.message)
        })

    }

    render() {
        return(
            <div >
                <div><button onClick={this.props.irParaHome}> Ir para Home </button></div>
                <h1> Criando Playlist</h1>
                <div>
                    <input
                        placeholder="Digite o nome da Playlist" 
                        value={this.state.name}
                        onChange={this.handleNome}
                        type="text"                   
                    ></input>

                    <button onClick={this.criarPlaylist}>
                        Criar Playlist
                    </button>

                </div>
            </div>  
        )
    }
}
  
