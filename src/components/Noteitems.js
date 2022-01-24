import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

const Noteitems = (props) => {
    const context = useContext(NoteContext)
    const {deleteNote} = context
    const { note, updatenote } = props
    return (
        <div className="col-md-4">
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id);props.showalert("Note Deleted" , 'success')}}></i>
                    <i className="far fa-edit mx-2" onClick={()=>{updatenote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitems
