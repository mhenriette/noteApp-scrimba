import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"

export default function App() {
    /**
     * Challenge:
     * 1. Every time the `notes` array changes, save it 
     *    in localStorage. You'll need to use JSON.stringify()
     *    to turn the array into a string to save in localStorage.
     * 2. When the app first loads, initialize the notes state
     *    with the notes saved in localStorage. You'll need to
     *    use JSON.parse() to turn the stringified array back
     *    into a real JS array.
     */
    
    const [notes, setNotes] = React.useState(JSON.parse(localStorage.getItem('Notes')) || [])
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
    localStorage.setItem('Notes', JSON.stringify(notes))

       
    function deleteNote(event, noteId) {
        event.stopPropagation()
      
        // console.log(noteId)
         setNotes(notes=>notes.filter(el=>el.id!==noteId))
        // Your code here
    }

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {

        setNotes(oldNotes => {

          const newNotes = oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? {id:oldNote.id, body: text }
                : oldNote
        })
       const currentNote= newNotes.find(note=>note.id==currentNoteId)
      const updatedNotes=  newNotes.filter(el=>el.id!==currentNoteId)
      console.log(currentNote, 'current', updatedNotes)
      

    return [currentNote, ...updatedNotes]
    }

    )
       

        

    }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
