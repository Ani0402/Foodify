import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
const Login = () => {
  const [credentials,setCredentials] =useState({email:"",password:""})
 
  const navigate=useNavigate()


  const handleSubmit = async(e) => {
    e.preventDefault()
    const response=await fetch("http://localhost:4000/api/login",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:credentials.email,password:credentials.password})
    })

    const json=await response.json()
    console.log(json);

    if(!json.success){
       alert("Enter Valid Credentials")
    }
    else{
      localStorage.setItem("userEmail",credentials.email) 
      localStorage.setItem("token",json.token)
      console.log(localStorage.getItem("token"))
      navigate("/") 
    }

  }
  return (
    <div>
          <div className="container">
              <form onSubmit={handleSubmit}>
                  
                  <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input type="email" className="form-control" value={credentials.email} onChange={(e)=>setCredentials({...credentials,email:e.target.value})} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>

                  <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" value={credentials.password} onChange={(e)=>setCredentials({...credentials,password:e.target.value})} id="exampleInputPassword1" placeholder="Password"/>
                  </div>

                  <button type="submit" className="m-3 btn btn-primary">Submit</button>

                  <Link to="/createUser" className="m-3 btn btn-danger">Create a user</Link>
          </form>
      </div>
    </div>
  )
}

export default Login
