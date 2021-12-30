import { useEffect, useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Highlight from '@tiptap/extension-highlight';
import MenuBar from '../MenuBar/MenuBar';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { IndexeddbPersistence } from 'y-indexeddb';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import './TextEditor.css';
import * as api from '../../api/index'

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

// Store the Y document in the browser
new IndexeddbPersistence('example-document', ydoc); //offline session support for sudden session loss

// Registered with a WebRTC provider
const provider = new WebrtcProvider('example-document', ydoc);

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
    //content: '<p>Lorem ipsum..</p>'
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

  useEffect(
    () => {
      if (!editor) {
        return null;
      }

      //get the content after every change.
      editor.on('update', () => {
        setJson(editor.getJSON());
        //console.log(json)
      });
    },
    [ editor,json ]
  );

  const handleDB= async ()=>{
    try{
      await api.saveDoc({doc:json})
    }
    catch(error){
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
      <pre>
        <code>{JSON.stringify(json, null, 2)}</code>
      </pre>
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
      
    </div>
    <div><button onClick={handleDB}>Save</button></div>
    </>
    
  );
};

export default TextEditor;
