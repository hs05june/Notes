import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import NoteContext from '../context/noteContext'
import Card from './Card'
import Form from './Form'
import Modal from './Modal'
import {useNavigate} from 'react-router-dom'

const Home = (props) => {
  const Notes = useContext(NoteContext);
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){
    Notes.getNote();}
    else{
      navigate("/login");
    }
  },[Notes.notes]);

  return (<>
    <Form/>
    <h1 className="text-center">Your Notes</h1>
    <div className="allNotes container">
    {Notes.notes.length===0 && <h5 className="text-center text-muted">No Notes to Display</h5>}
     { Notes.notes.map((ele)=>{
       let a = new Date(ele.date);
       let b = new Date(ele.lastUpdated);
       let create = `${a.getDate()}/${a.getMonth()+1}/${a.getFullYear()} ${a.getHours()}:${a.getMinutes()}`
       let update = `${b.getDate()}/${b.getMonth()+1}/${b.getFullYear()} ${b.getHours()}:${b.getMinutes()}`
       return <>
              <Modal key={"modal"+ele._id} _id={ele._id} title={ele.title} tag={ele.tag} content={ele.content}/> 
              <Card key={"card"+ele._id} _id={ele._id} title={ele.title} tag={ele.tag} content={ele.content} date={create} lastUpdated={update}/>
              </>
      })}
    </div>
    </>
  )
}

Home.propTypes = {

}
export default Home
