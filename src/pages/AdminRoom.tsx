import React, { useState } from 'react'

import { useHistory, useParams } from 'react-router-dom';

import deleteImg from '../assets/images/delete.svg';

import { useRoom } from '../hooks/useRoom';

import logo from '../assets/images/logo.svg'
import Button from '../components/Button';
import Question from '../components/Question';
import RoomCode from '../components/RoomCode';
// import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

function AdminRoom() {
  // const { user } = useAuth();
  const { id } = useParams<RoomParams>();
  const { questions, title } = useRoom(id);
  const history = useHistory();

  async function handleEndRoom() {
    await database.ref(`/rooms/${id}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${id}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="Letmeask" />
          <div>
            <RoomCode code={id}/>
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && (
            <span>{questions.length} pergunta(s)</span>
          )}
        </div>

        <div className="question-list">
          {questions.map(question => (
            <Question 
              key={question.id} 
              content={question.content} 
              author={question.author}
            >
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  )
}

export default AdminRoom;
