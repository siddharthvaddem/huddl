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
    { docID!=='' && docToFetch==='' &&
      <h4>Doc ID- {docID}</h4>
    }
    { docID==='' && docToFetch!=='' &&
      <h4>Doc ID- {docToFetch}</h4>
      
    }
    <input
         type="text"
         value={docToFetch}
         style={{ background: '#ffffe7' }}
         placeholder='ENTER DOC ID'
         onChange={
         (e) => {setDocToFetch(e.target.value)}
        }
    />
    <button onClick={fetchDoc} >Doc to fetch</button>
    { docID!=='' &&(
      <>
    <button onClick={handleNewDoc} >Open new Doc</button>
     <button onClick={handleDelete} >Delete current Doc</button>
    </>
    )
    }
    <div className="editor">
      {/*display menu bar only when the editor exits. Menu bar contains all the options to format the t
        text document*/}
      {editor && <MenuBar editor={editor} />}
      {/*editor content displays the text editor on the screen*/}
      
      <EditorContent className="editor-content" editor={editor} />
     

      {/*footer to display the room details and number of users*/}
      <div className="editor-footer">
        <div className={`editor__status editor__status--${status}`}>
          {status === 'connected' ? (
            `${editor.storage.collaborationCursor.users.length} user${editor.storage.collaborationCursor.users
              .length === 1
              ? ''
              : 's'} online in ${room}`
          ) : (
            'offline'
          )}
        </div>
        <div className="editor__name">
          <button onClick={setName}>{currentUser.name}</button>
        </div>
      </div>
      <div>
        {' '}
        <button onClick={handleDB}>Save</button>
      </div>
    </div>
  
    </>);
};

export default TextEditor;
