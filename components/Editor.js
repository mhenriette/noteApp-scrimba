import React, { useState, useEffect } from "react"
import ReactMde from "react-mde"
import Showdown from "showdown"

export default function Editor({ currentNote, updateNote }) {
    const [selectedTab, setSelectedTab] = useState("write")
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })
    return (
        <section className="pane editor">
            <ReactMde
                value={currentNote.body}
                onChange={updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={ async (markdown) =>  await converter.makeHtml(markdown)
                }
                minEditorHeight={80}
                heightUnits="vh"
            />
        </section>
    )
}
