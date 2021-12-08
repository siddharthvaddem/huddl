import {useEditor , EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Highlight from '@tiptap/extension-highlight'
import MenuBar from '../MenuBar/MenuBar'
import './TextEditor.css'

const TextEditor = () => {

    const editor = useEditor({
        extensions: [
          StarterKit,
          Highlight,
          TaskList,
          TaskItem,
        ],
        content: '<p>Hello World!</p>',
      })

      return (
        <div className='editor'>
          {editor && <MenuBar editor={editor} />}
          <EditorContent className="editor-content" editor={editor} />
          <div className="editor-footer">
            Footer
          </div>
        </div>
      )



}

export default TextEditor;