import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

export default function Register() {
    const [user,setUser] = useState({name:"",password:"",email:"",username:""})
    const navigate = useNavigate();
    const handleRegister = async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:80/auth/',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({name:user.name,email:user.email,username:user.username,password:user.password})
        });
        const json = await response.json();
        // console.log(json);
        if(json.token){
            localStorage.setItem('token',json.token);
            navigate("/");
        }
        else{
            console.log("user not registered");
        }
    }
    const handleChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }
  return (
    <div className="container">
      <form className="row g-3" onSubmit={handleRegister}>
  <div className="col-12">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name" onChange={handleChange}/>
  </div>
  <div className="col-12">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" name="email" placeholder="Enter Email"  onChange={handleChange}/>
  </div>
  <div className="col-md-6">
    <label htmlFor="username" className="form-label">Username</label>
    <input type="text" className="form-control" id="username" name="username" placeholder="Enter Username" onChange={handleChange}/>
  </div>
  <div className="col-md-6">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" onChange={handleChange}/>
  </div>
  
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Sign in</button>
  </div>
</form>
    </div>
  )
}
