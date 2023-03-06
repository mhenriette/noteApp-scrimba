import React from "react";

const NoteTitle = ({note, currentNote, setCurrentNoteId, deleteNote}) => {
    return <div>
        <div
            className={`title ${note.id === currentNote.id ? "selected-note" : ""
                }`}
            onClick={() =>setCurrentNoteId(note.id)}
        >
            <h4 className="text-snippet">{note.body.split('\n')[0]}</h4>
            <button
                className="delete-btn"
                onClick={(e) => deleteNote(e, note.id)}
            >
                <i className="gg-trash trash-icon"></i>
            </button>
        </div>
    </div>;
};

export default NoteTitle;
