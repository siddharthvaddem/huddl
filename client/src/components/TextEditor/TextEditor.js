import {useEditor , EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Highlight from '@tiptap/extension-highlight'
import MenuBar from '../MenuBar/MenuBar'
import './TextEditor.css'

const TextEditor = () => {


    //editor is used to get data and format the data
    const editor = useEditor({
        extensions: [
          StarterKit,
          Highlight,
          TaskList,
          TaskItem,
        ],
        content: '<p>Start typing here..</p>',
      })

      return (
        <div className='editor'>
          {/*display menu bar only when the editor exits. Menu bar contains all the options to format the t
          text document*/}
          {editor && <MenuBar editor={editor} />}
          {/*editor content displays the text editor on the screen*/}
          <EditorContent className="editor-content" editor={editor} />
          {/*footer to display the room details and number of users*/}
          <div className="editor-footer">
            Footer
          </div>
        </div>
      )



}

export default TextEditor;