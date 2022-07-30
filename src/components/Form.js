import React,{useContext,useState} from 'react'
import NoteContext from '../context/noteContext'

export default function Form() {
    const noteContext = useContext(NoteContext);
    
    const [note,setNote] = useState({title:"",tag:"",tag:""})

    const handleClick = (e) =>{
        e.preventDefault();
        noteContext.addNote(note);
        document.getElementById("content").value="";
        document.getElementById("tag").value="";
        document.getElementById("title").value="";
    }

    const handleChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <div>
      <form className='container my-2'>
      <div className="row">
  <div className="col">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" onChange={handleChange}/>
  </div>
  <div className="col">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange}/>
  </div>
</div>
  <div className="mb-3">
    <label htmlFor="content" className="form-label">Content</label>
    <textarea rows={3} type="text" className="form-control" id="content" name="content" onChange={handleChange}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
    </div>
  )
}
