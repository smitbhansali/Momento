import noteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000/api/"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //fetchallnote
    const fetchallNote = async ()=>{
        const url = host+"notes/fetchallnotes"
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json)
    }

    //addnote
    const addNote = async (title, description, tag)=>{
        const url = host+"notes/addnote/"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        
        setNotes(notes.concat(json))
    }

    //deletenote
    const deleteNote = async (id)=>{
        const url = host+"notes/deletenote/" + id
        await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('token')
            },
        });
        const newnotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newnotes)
    }

    //editnote
    const editNote = async (id, title, description, tag)=>{

        const url = host+"notes/updatenote/" + id
        await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });

        let newnotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newnotes.length; index++) {
            if (newnotes[index]._id === id) {
                newnotes[index].title = title
                newnotes[index].description = description
                newnotes[index].tag = tag
                break
            }
        }
        setNotes(newnotes)
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchallNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;