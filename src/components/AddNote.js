import React, {useContext, useState} from 'react'
import NoteContext from '../context/notes/NoteContext'


const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addNote} = context

    const [note, setnote] = useState({title:"",description:"",tag:""})
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({title:"",description:"",tag:""})
        props.showalert("Note Added" , 'success')
    }

    const onchange = (e)=>{
        setnote({...note, [e.target.name]:e.target.value})
    }

    return (
        <div className="conatiner my-4">
            <h1>Add a Note</h1>
            <div className="container my-4">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input value={note.title} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onchange} minLength={52} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input value={note.description} type="text" className="form-control" id="description" name="description" onChange={onchange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input value={note.tag} type="text" className="form-control" id="tag" name="tag" onChange={onchange} minLength={2} />
                    </div>
                    <button disabled={note.title.length<2 || note.description.length<5 || note.tag.length<2} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
