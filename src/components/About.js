import React from 'react'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import NoteContext from '../context/noteContext'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
const About = (props) => {
  const location = useLocation()
  const a = useContext(NoteContext)
  useEffect(()=>{
    a.update();
    console.log("fired");
  },[])
  return (
    <div>
      This is about {a.state.name} and class btech
    </div>
  )
}

About.propTypes = {

}

export default About
