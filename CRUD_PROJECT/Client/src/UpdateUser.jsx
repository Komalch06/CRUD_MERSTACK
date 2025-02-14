import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios"
const UpdateUser = () => {
    const {id} = useParams();
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [age, setAge] = useState(null);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/getUser/${id}`)
            .then(result => {
                if (result.data) {
                    setName(result.data.name || '')
                    setEmail(result.data.email || '')
                    setAge(result.data.age || '')
                } else {
                    console.error('User not found');
                    navigate('/');
                }
            })
            .catch(error => {
                console.error('Error fetching user:', error);
                navigate('/');
            });
    }, [id, navigate]);

    const update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/updateUser/${id}`, { name, email, age })
            .then(result => {
                console.log(result)
                navigate('/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={update}>
                    <h2 className='text-center'>Update User</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input type='text' className='form-control' placeholder='Enter Name'
                            value={name || ""} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Email</label>
                        <input type='email' className='form-control' placeholder='Enter Email'
                            value={email || ""} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Age</label>
                        <input type='number' className='form-control' placeholder='Enter Age'
                            value={age || ""} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div>
                        <button className='btn btn-success'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser