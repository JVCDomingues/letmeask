import React from 'react'

import illustrationImg from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import Button from '../components/Button';

import '../styles/auth.scss';

function NewRoom() {
  return (
    <div id="page-auth">
    <aside>
      <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
      <strong>Crie salas de  Q&amp;A ao vivo</strong>
      <p>Tire as suas dúvidas de sua audiência em tempo real</p>
    </aside>
    <main>
      <div className="main-content">
        <img src={logo} alt="Let Me Ask" />
        <button className="create-room">
          Criar uma nova sala
        </button>

        <form>
          <input type="text" placeholder="Nome da sala" />
          <Button type="submit">Criar sala</Button>
        </form>

        <p>Quer entrar numa sala existente? <a href="#">Clique aqui</a></p>
      </div>
    </main>
  </div>
  )
}

export default NewRoom
