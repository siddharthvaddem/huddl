import { useEffect, useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Highlight from '@tiptap/extension-highlight';
import MenuBar from '../MenuBar/MenuBar';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import './TextEditor.css';
import { IndexeddbPersistence } from 'y-indexeddb';
import * as api from '../../api/index';
import swal from 'sweetalert';

const colors = [ '#958DF1', '#F98181', '#FBBC88', '#FAF594', '#70CFF8', '#94FADB', '#B9F18D' ];
const rooms = [ 'rooms.10', 'rooms.11', 'rooms.12' ];
const names = [
  'Lea Thompson',
  'Cyndi Lauper',
  'Tom Cruise',
  'Madonna',
  'Jerry Hall',
  'Joan Collins',
  'Winona Ryder',
  'Christina Applegate',
  'Alyssa Milano',
  'Molly Ringwald',
  'Ally Sheedy',
  'Debbie Harry',
  'Olivia Newton-John',
  'Elton John',
  'Michael J. Fox',
  'Axl Rose',
  'Emilio Estevez',
  'Ralph Macchio',
  'Rob Lowe',
  'Jennifer Grey',
  'Mickey Rourke',
  'John Cusack',
  'Matthew Broderick',
  'Justine Bateman',
  'Lisa Bonet'
];

const getRandomElement = (list) => list[Math.floor(Math.random() * list.length)];

const getRandomRoom = () => getRandomElement(rooms);
const getRandomColor = () => getRandomElement(colors);
const getRandomName = () => getRandomElement(names);

const room = getRandomRoom();

const ydoc = new Y.Doc();
// Registered with a WebRTC provider
const provider = new WebrtcProvider('example-document', ydoc);

new IndexeddbPersistence('example-document', ydoc); //offline session support for sudden session loss

const getInitialUser = () => {
  return (
    JSON.parse(localStorage.getItem('currentUser')) || {
      name: getRandomName(),
      color: getRandomColor()
    }
  );
};

const TextEditor = () => {
  const [ status, setStatus ] = useState('connecting');
  const [ docID, setDocID ] = useState('');
  const [ docToFetch, setDocToFetch ] = useState('');
  //const [newDoc,setNewDoc]=useState('');

  const [finishStatus, setfinishStatus] = useState(false);
  const [ currentUser, setCurrentUser ] = useState(getInitialUser);
  const [ json, setJson ] = useState({});
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false
      }),
      StarterKit,
      Highlight,
      TaskList,
      TaskItem,
      Collaboration.configure({
        document: ydoc
      }),
      CollaborationCursor.configure({
        provider: provider
      })
    ],
    content: '<p>Start typing here..</p>'
  });

  useEffect(
    () => {
      if (editor && currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        editor.chain().focus().updateUser(currentUser).run();
      }
    },
    [ editor, currentUser ]
  );
  const onBackButton = (e) => {
   
    e.preventDefault();
    if (!finishStatus) {
            setfinishStatus(true)
            setTimeout(window.location.reload(),10000);
          }
  }
  useEffect(() => {
    window.addEventListener('popstate', onBackButton);
    return () => {
      window.removeEventListener('popstate', onBackButton);  
    };
  }, []);

  useEffect(
    () => {
      if (!editor) {
        return null;
      }

      //get the content after every change.
      editor.on('update', () => {
        setJson(editor.getJSON());
      });
    },
    [ editor ]
  );

  const handleDB = async () => {
    try {
      //console.log(json);
      const loc = window.location.href;
      const roomcode = loc.substring(loc.lastIndexOf('/') + 1);
      //check if the docid already exists. if it does then update doc else writeDoc
      //console.log(docID) 
      if(docID==='')
      {
      const data = { json, roomcode };
      const response = await api.saveDoc({ data: data });
      setDocID(response.data.key);
      }
      else{
        const data={docID,json,roomcode};
        await api.updateDoc(data);
        }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDoc=async()=>{
    
      
    try{
      //console.log(docToFetch)
      if(docToFetch==='')
      swal ( "Oops" ,  "Doc to be fetched cannot be empty!" ,  "error" )
      //alert("Doc to be fetched cannot be empty")
      const response=await api.getDoc({id:docToFetch});
       setDocToFetch('');
       setDocID(response.data.key);
       const data=response.data.json
       //console.log(data);
       editor.commands.setContent(data);
      
    }
    catch(error){
        console.log(error)
    }
  }

  const handleNewDoc=()=>{
    setDocID('');
    editor.commands.setContent({
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Start typing here."
            }
          ]
        }
      ]
    });
  }

   const handleDelete= async()=>{
       try{
        // console.log(docID);
         await api.deleteDoc({id:docID});
         setDocID('');
         editor.commands.setContent({
          "type": "doc",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "Start typing here..."
                }
              ]
            }
          ]
        });
       }
       catch(error)
       {
         console.log(error) 
       }
   }
  const setName = useCallback(
    () => {
      const name = (window.prompt('Name') || '').trim().substring(0, 32);

      if (name) {
        return setCurrentUser({ ...currentUser, name });
      }
    },
    [ currentUser ]
  );

  return (
    <>
      <div className="editor">
      {/*display menu bar only when the editor exits. Menu bar contains all the options to format the t
        text document*/}
      {editor && <MenuBar editor={editor} />}
      {/*editor content displays the text editor on the screen*/}
      
      <EditorContent className="editor-content" editor={editor} />
     

      {/*footer to display the room details and number of users*/}
      <div className="editor-footer flex flex-row ">
        
        <div className="editor__name">
          <button className="px-3 mx-3 py-2 hover:bg-indigo-400 hover:text-white bg-white text-black rounded font-bold" onClick={setName}>{currentUser.name}</button>
        </div>
        { docID!=='' && docToFetch==='' &&
          <h4 className='bg-white text-indigo-400 rounded px-2 py-2 '>DOC ID:{docID}</h4>
        }
        { docID==='' && docToFetch!=='' &&
          <h4 className="bg-white text-indigo-400 rounded px-2 py-2 ">DOC ID:{docToFetch}</h4>
        }
        <div className='editor__crud flex flex-row '>
          <button className="px-3 mx-3 hover:bg-indigo-400 hover:text-white bg-white text-black rounded font-bold"  onClick={handleDB}>SAVE</button>
          <input
              type="text"
              value={docToFetch}
              className="bg-black appearance-none rounded-md border-black   py-1 px-6  text-black leading-tight focus:outline-none focus:bg-indigo-200 focus:border-indigo-200 border-4" 
              placeholder='ENTER DOC ID'
              onChange={
              (e) => {setDocToFetch(e.target.value)}
              }
          />
          <button onClick={fetchDoc}  className="px-3 mx-3 hover:bg-indigo-400 bg-white text-black rounded font-bold" >FETCH</button>
          { docID!=='' &&
            (
              <>
                <button className="px-3 mx-3 hover:bg-rose-500 bg-white text-black rounded font-bold" onClick={handleNewDoc} >NEW</button>
                <button className="px-3 mx-3 hover:bg-rose-500 bg-white text-black rounded font-bold" onClick={handleDelete} >DELETE</button>
              </>
            )
          }
        </div>

      </div>
    </div>
  
    </>);
};

export default TextEditor;
