import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import "../styles/auth.scss";
import "../styles/modal.scss";

import Button from "../components/Button";
import { database } from "../services/firebase";

export default function Home() {
   const [roomCode, setRoomCode] = useState("");
   const { signInWithGoogle, user } = useAuth();
   const history = useHistory();

   async function handleCreateRoom() {
      if (!user) {
         await signInWithGoogle();
      }
      history.push("/rooms/new");
   }

   async function handleJoinRoom(event: FormEvent) {
      event.preventDefault();

      if (roomCode.trim() === "") {
         return;
      }

      const roomRef = await database.ref(`rooms/${roomCode}`).get();

      if (!roomRef.exists()) {
         alert("Room does not exists.");
         return;
      }

      if (roomRef.val().endedAt) {
         alert("Room already closed.");
         return;
      }

      history.push(`rooms/${roomCode}`);
   }

   return (
      <div id="page-auth">
         <aside>
            <img
               src={illustrationImg}
               alt="Ilustração simbolizando Perguntas e respostas"
            />
            <strong>Crie salas de Q&amp;A ao-vivo</strong>
            <p>Tire as dúvidas da sua audiência em tempo-real </p>
         </aside>

         <main>
            <div className="main-content">
               <img src={logoImg} alt="Letmeask" />
               <button onClick={handleCreateRoom} className="create-room">
                  <img src={googleIconImg} alt="Logo do Google" />
                  Crie sua sala com o Google
               </button>
               <div className="separator">ou entre em uma sala</div>
               <form onSubmit={handleJoinRoom}>
                  <input
                     type="text"
                     placeholder="Digite o código da sala"
                     onChange={(event) => setRoomCode(event.target.value)}
                  />
                  <Button type="submit">Entrar na sala</Button>
               </form>
            </div>
         </main>
      </div>
   );
}
