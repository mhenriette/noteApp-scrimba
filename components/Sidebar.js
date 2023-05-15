import React from "react"
import NoteTitle from "./NoteTitle"

export default function Sidebar(props) {
    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {props.notes.map((note) => (
                <NoteTitle note={note} key={note.id} deleteNote={props.deleteNote} setCurrentNoteId={props.setCurrentNoteId} currentNote={props.currentNote} />
            ))}

        </section>
    )
}
