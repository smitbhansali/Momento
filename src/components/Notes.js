import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import NoteContext from '../context/notes/NoteContext'
import AddNote from './AddNote';
import Noteitems from './Noteitems';



const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, fetchallNote, editNote } = context
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token'))
        {
            fetchallNote();
        }
        else
        {
            navigate("/login");
            props.showalert("Please Login" , 'danger')    
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef();
    const refclose = useRef();

    const updatenote = (currentnote) => {
        ref.current.click();
        setnote({id: currentnote._id , etitle: currentnote.title , edescription: currentnote.description , etag: currentnote.tag});
    }

    const [note, setnote] = useState({id:"", etitle:"",edescription:"",etag:""})
    const handleClick = (e)=>{
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refclose.current.click();
        props.showalert("Note edited" , 'success')
    }

    const onchange = (e)=>{
        setnote({...note, [e.target.name]:e.target.value})
    }

    return (
        <>
            <AddNote showalert={props.showalert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onchange} value={note.etitle} minLength={2} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onchange} value={note.edescription} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onchange} value={note.etag} minLength={2}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<2 || note.edescription.length<5 || note.etag.length<2} type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-4">
                <h1>Your Notes</h1>
                <div className="container mx-3">
                    {notes.length===0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitems key={note._id} note={note} updatenote={updatenote} showalert={props.showalert} />
                })}
            </div>
        </>
    )
}

export default Notes
