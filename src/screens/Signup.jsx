import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {

  const [credentials,setCredentials] =useState({name:"",email:"",password:"",location:""})

  const handleSubmit = async(e) => {
    e.preventDefault()
    const response=await fetch("http://localhost:4000/api/createUser",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:credentials.name,location:credentials.location,email:credentials.email,password:credentials.password})
    })

    const json=await response.json()
    console.log(json);

    if(!json.success){
       alert("Enter Valid Credentials")
    }
  }

  return (
    <>
    <div className="container">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input type="text" className="form-control" placeholder="Enter Name" name="name" value={credentials.name} onChange={(e)=>setCredentials({...credentials,name:e.target.value})}/>
            </div>

            <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" value={credentials.email} onChange={(e)=>setCredentials({...credentials,email:e.target.value})} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>

            <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={(e)=>setCredentials({...credentials,password:e.target.value})} id="exampleInputPassword1" placeholder="Password"/>
            </div>

            <div className="form-group">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input type="text" className="form-control" value={credentials.location} onChange={(e)=>setCredentials({...credentials,location:e.target.value})}  placeholder="Address"/>
            </div>

            <button type="submit" className="m-3 btn btn-primary">Submit</button>

            <Link to="/login" className="m-3 btn btn-danger"> Already a user?</Link>
    </form>
  </div>
    </>
  )
}

export default Signup
