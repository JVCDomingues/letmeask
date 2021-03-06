import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import Button from '../components/Button';

import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { database } from '../services/firebase';

function Home() {
  const { signInWithGoogle, user } = useAuth();
  const [roomCode, setRoomCode] = useState('');
  const [hasClosedRoom, setHasClosedRoom] = useState(false);

  const history = useHistory();

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle();
    }

    history.push('rooms/new');
  }

  async function handleJoinRoom(event: React.FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()) {
      alert('Room does not exist');
      return;
    }

    if(roomRef.val().endedAt) {
      setHasClosedRoom(true);
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

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
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIcon} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input type="text" placeholder="Digite o código da sala" onChange={event => setRoomCode(event.target.value)} value={roomCode}/>
            {hasClosedRoom && (
              <div className="closed-room">
                <span>Room has already been closed.</span>
              </div>
            )}
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home;
