import React from 'react'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import NoteContext from '../context/noteContext'
const Card = (props) => {

    const context = useContext(NoteContext);
    const {deleteNote} = context;

  return (
    <div>
     <div className="card text-center mx-2 my-2">
      <span className="badge rounded-pill text-bg-danger" style={{width:100+"px"}}>{props.tag}</span> 
      <div className="btn-group" role="group" >
  <button type="submit" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={"#staticBackdrop"+props._id}>Edit</button>
  <button type="button" className="btn btn-danger" onClick={()=>{deleteNote(props._id)}}>Delete</button>
</div>
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text">{props.content}</p>
  </div>
  <div className="card-footer text-primary" style={{display:"flex",justifyContent:"space-between"}}>
    <span>Created on {props.date}</span>{props.lastUpdated !=="1/1/1970 5:30" ? <span> Last Updated on {props.lastUpdated}</span>:""}
  </div>
</div>
    </div>
  )
}

Card.propTypes = {

}

export default Card
