import TextEditor from "../../components/TextEditor/TextEditor";
import NavBar from "../../components/NavBar/NavBar";

const RoomPage = () => {
    const loc = window.location.href;
    const roomId = loc.substring(loc.lastIndexOf('/') + 1);
    return (  
        <div>
            <NavBar roomId={roomId} />
            <TextEditor />
        </div>
    );
}


export default RoomPage;