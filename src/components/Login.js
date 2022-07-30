import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Login() {
    const [user,setUser] = useState({username:"",password:""})
    const navigate = useNavigate();
    const handleLogin = async(e) =>{
        e.preventDefault();
        const response = await fetch('http://localhost:80/auth/login/',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({username:user.username,password:user.password})
        });

        const json = await response.json();

        if(json.token){
            localStorage.setItem('token',json.token);
            navigate("/");
        }
        else{
          console.log("Invalid credentials");
        }
    }

    const handleChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

  return (
    <div className='container'>
      <form onSubmit={handleLogin}>
  <div className="mb-3">
    <label htmlFor="username" className="form-label">Username</label>
    <input type="text" name="username" className="form-control" id="username" onChange={handleChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" name="password" className="form-control" id="password" onChange={handleChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form>
    </div>
  )
}

export default Login
