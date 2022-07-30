import React,{useRef,useContext} from 'react'
import NoteContext from '../context/noteContext'

export default function Modal(props) {
    const titleRef = useRef()
    const tagRef = useRef()
    const contentRef = useRef()

    const context = useContext(NoteContext);
    // document.getElementById("title").value = props.title;
    // document.getElementById("content").value = props.content;
    // document.getElementById("tag").value = props.tag;
    const editNote = ()=>{
        context.updateNote(props._id,titleRef.current.value,contentRef.current.value,tagRef.current.value);  
        console.log(props._id,props.title,props.tag,props.content);      
    }
  return (
    <div className="modal fade" id={"staticBackdrop" + props._id}data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">Update Note</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <form className="container">
        <input className="form-control" type="text" placeholder="Title" name='title' id="title" aria-label="default input example" ref={titleRef}/>
        <input className="form-control my-2" type="text" placeholder="Tag" name="tag" id="tag" aria-label="default input example" ref={tagRef}/>
        <input className="form-control" type="text" placeholder="Content" name="content" id="content" aria-label="default input example" ref={contentRef}/>
        </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary" onClick={editNote} data-bs-dismiss="modal">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
  )
}
