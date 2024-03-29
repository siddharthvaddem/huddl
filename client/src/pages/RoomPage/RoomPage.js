import TextEditor from '../../components/TextEditor/TextEditor';
import NavBar from '../../components/NavBar/NavBar';

import { RoomContext } from '../../context/room.context';
import { useContext } from 'react';

const RoomPage = () => {
  const loc = window.location.href;
  const roomId = loc.substring(loc.lastIndexOf('/') + 1);

  //const {roomId} = useContext(RoomContext);


  return (
    <div>
      <div
        class=" ml-8 my-5 mr-8 flex items-center bg-teal-600 text-white text-sm font-bold px-4 py-3 w-2/5"
        role="alert"
      >
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
        </svg>
        <p>Don't start your typing session until your peer joins. Happy huddling.</p>
      </div>

      <TextEditor />
    </div>
  );
};

export default RoomPage;
