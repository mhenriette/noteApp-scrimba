import React, { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split"
import { nanoid } from "nanoid"

export default function App() {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('Notes')) || [])
    const [currentNoteId, setCurrentNoteId] = useState(
        notes[0] ? notes[0].id : ""
    )
    useEffect(() => {
        localStorage.setItem('Notes', JSON.stringify(notes))

    }, [])


    function deleteNote(event, noteId) {
        event.stopPropagation()
        setNotes(notes => notes.filter(el => el.id !== noteId))
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
                    ? { id: oldNote.id, body: text }
                    : oldNote
            })
            const currentNote = newNotes.find(note => note.id === currentNoteId)
            const updatedNotes = newNotes.filter(el => el.id !== currentNoteId)
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
