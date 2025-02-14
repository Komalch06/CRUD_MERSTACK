import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom'
const CreateUser = () => {
    const[name,setName] = useState();
    const[email,setEmail] = useState();
    const[age,setAge] = useState();
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/createUser",{name,email,age})
        .then((result) => {
            console.log(result);
            navigate('/')
            })
            .catch((err) => {
                console.log(err);
                });
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit = {Submit}>
                    <h2 className='text-center'>Create User</h2>
                    <div className='mb-2'>
                        <label>Name</label>
                        <input type='text' className='form-control' placeholder ='Enter Name'
                         onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label>Email</label>
                        <input type='email' className='form-control' placeholder ='Enter Email'
                        onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label>Age</label>
                        <input type='text' className='form-control' placeholder ='Enter Age'
                        onChange={(e)=>setAge(e.target.value)}/> 
                    </div>
                    <div>
                        <button className='btn btn-success'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateUser