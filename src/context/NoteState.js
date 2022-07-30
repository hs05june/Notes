import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const ini = {
        name:"harry",
        class:"btech",
        i:1
    }
    let arr = ["harry","larry","hargun","param"]
    const [state,setState] = useState(ini);

    const update = ()=>{
            let a = parseInt(localStorage.getItem('i'));
            setState({name:arr[a],class:"btech",i:state.i+1})
            localStorage.setItem('i',(a+1)%4);
            console.log(state.i,a);
}

    const host = "http://localhost:80";

      const [notes,setNotes] = useState([])
// Get Notes
    const getNote = async()=>{
      const response = await fetch(`${host}/notes/fetchall/`,{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setNotes(json);
    }
// Add note
      const addNote = async(a) =>{
        const response = await fetch(`${host}/notes/add/`,{
          method : 'POST',
          headers : { 'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')},
          body:JSON.stringify({title:a.title,content:a.content,tag:a.tag})
        });
        const json = await response.json();
        setNotes(notes.concat(json))
      }
// Delete note
      const deleteNote = async(id) =>{
        const response = await fetch(`${host}/notes/delete/${id}`,{
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          }
        });
        let newNotes = notes.filter((note) =>{ return note._id !== id});
        setNotes(newNotes);
      }

// Update note
      const updateNote = async(id,title,content,tag) =>{
        const response = await fetch(`${host}/notes/update/${id}`,{
          method : 'PUT',
          headers : { 'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')},
          body:JSON.stringify({title,content,tag})
        });

        const json = await response.json();
        // console.log(response);
        for(let i in notes) {
          if(i._id==id){
            i.title = title;
            i.content = content;
            i.tag = tag;
            break;
          }
      }
      setNotes(notes);
    }
    return (
        <NoteContext.Provider value={{notes,setNotes,state,update,addNote,deleteNote,getNote,updateNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;