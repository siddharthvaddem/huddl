import TextEditor from "../../components/TextEditor/TextEditor";
import Player from "../../Communication/Player";
import Notification from "../../Communication/Notification";
import Options from "../../Communication/Options";

const RoomPage = () => (
    <div>
        <TextEditor />
        <Player />
        <Options>
        <Notification />
        </Options>
    </div>
);


export default RoomPage;