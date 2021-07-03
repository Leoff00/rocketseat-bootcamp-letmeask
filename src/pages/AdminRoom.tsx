import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

import logoImg from "../assets/images/logo.svg";
import Button from "../components/Button";
import Question from "../components/Question";
import RoomCode from "../components/RoomCode";
// import { useAuth } from "../hooks/useAuth";
import useRoom from "../hooks/useRoom";
import { database } from "../services/firebase";
import "../styles/room.scss";
import { useState } from "react";
import Modal from "../components/Modal";

type RoomParams = {
   id: string;
};

export default function AdminRoom() {
   const [isModalVisible, setIsModalVisible] = useState(false);

   // const { user } = useAuth();
   const history = useHistory();
   const params = useParams<RoomParams>();
   const roomId = params.id;
   const { title, questions } = useRoom(roomId);

   async function handleEndRoom() {
      await database.ref(`rooms/${roomId}`).update({
         endedAt: new Date(),
      });

      history.push("/");
   }

   async function handleCheckQuestionasAnswered(questionId: string) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
         isAnswered: true,
      });
   }

   async function handleHightlightQuestion(questionId: string) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
         isHighlighted: true,
      });
   }

   async function handleDeleteQuestion(questionId: string) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
   }

   return (
      <div id="page-room">
         <header>
            <div className="content">
               <img src={logoImg} alt="Letmeask" />
               <div>
                  <RoomCode code={roomId} />
                  <Button onClick={handleEndRoom} isOutlined>
                     Encerrar sala
                  </Button>
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
               {questions.map((question) => {
                  return (
                     <Question
                        key={question.id}
                        content={question.content}
                        author={question.author}
                        isAnswered={question.isAnswered}
                        isHighlighted={question.isHighlighted}
                     >
                        {!question.isAnswered && (
                           <>
                              <button
                                 type="button"
                                 onClick={() =>
                                    handleCheckQuestionasAnswered(question.id)
                                 }
                              >
                                 <img
                                    src={checkImg}
                                    alt="Marcar pergunta como respondida"
                                 />
                              </button>
                              <button
                                 type="button"
                                 onClick={() =>
                                    handleHightlightQuestion(question.id)
                                 }
                              >
                                 <img
                                    src={answerImg}
                                    alt="Dar destaque a pergunta"
                                 />
                              </button>
                           </>
                        )}
                        <button
                           type="button"
                           onClick={() => setIsModalVisible(true)}
                        >
                           <img src={deleteImg} alt="Remover Pergunta" />
                        </button>

                        {isModalVisible ? (
                           <Modal
                              onClose={() => {
                                 setIsModalVisible(false);
                              }}
                           >
                              <div className="modal-children-style">
                                 <span className="span-text">
                                    Deseja realmente remover sua pergunta?
                                 </span>

                                 <div className="btn-container">
                                    <button
                                       onClick={() => setIsModalVisible(false)}
                                       className="btn-cancel"
                                    >
                                       Cancelar
                                    </button>
                                    <button
                                       onClick={() =>
                                          handleDeleteQuestion(question.id) &&
                                          setIsModalVisible(false)
                                       }
                                       className="btn-confirm"
                                    >
                                       OK!
                                    </button>
                                 </div>
                              </div>
                           </Modal>
                        ) : null}
                     </Question>
                  );
               })}
            </div>
         </main>
      </div>
   );
}
