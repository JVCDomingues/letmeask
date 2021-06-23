import React from 'react'

import { useParams } from 'react-router-dom';

import logo from '../assets/images/logo.svg'
import Button from '../components/Button';
import RoomCode from '../components/RoomCode';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

function Room() {
  const { id } = useParams<RoomParams>();

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="Letmeask" />
          <RoomCode code={id}/>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>5 perguntas</span>
        </div>

        <form>
          <textarea placeholder="O que você quer perguntar?"/>

          <div className="form-footer">
            <span>Para enviar uma pergunta,  <button>faça seu login</button>.</span>
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Room