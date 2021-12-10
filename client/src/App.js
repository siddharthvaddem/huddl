import TextEditor from './components/Texteditor/TextEditor';
import Player from './Communication/Player';
import Notification from './Communication/Notification';
import Options from './Communication/Options';
function App() {
  return (
    <div className="App">
      <TextEditor />
      <Player />
      <Options>
        <Notification />
      </Options>
    </div>
  );
}

export default App;
