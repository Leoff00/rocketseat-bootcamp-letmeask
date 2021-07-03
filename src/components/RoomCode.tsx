import copyImg from "../assets/images/copy.svg";
import "../styles/room-code.scss";

type RoomCodeProps = {
   code: string;
};

export default function RoomCode(props: RoomCodeProps) {
   function copyRoomCodeToClipboard() {
      navigator.clipboard.writeText(props.code);
      alert("Copiado para a área de transferência");
   }

   return (
      <button className="room-code" onClick={copyRoomCodeToClipboard}>
         <div>
            <img src={copyImg} alt="Copy room code" />
         </div>

         <span>Sala #{props.code}</span>
      </button>
   );
}
