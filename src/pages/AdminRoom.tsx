import React, { useState } from 'react'

import { useParams } from 'react-router-dom';

import { useRoom } from '../hooks/useRoom';

import logo from '../assets/images/logo.svg'
import Button from '../components/Button';
import Question from '../components/Question';
import RoomCode from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

function AdminRoom() {
  const { user } = useAuth();
  const { id } = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const { questions, title } = useRoom(id);

  async function handleSendQuestion(event: React.FormEvent) {
    event.preventDefault();

    if(newQuestion.trim() === '') {
      return;
    }

    if(!user) {
      throw new Error('You must be logged in');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${id}/questions`).push(question);

    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="Letmeask" />
          <div>
            <RoomCode code={id}/>
            <Button isOutlined>Encerrar sala</Button>
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
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default AdminRoom;
