import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const ModifyStore = () => {
    const [data, setData] = useState({})
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/stores/${id}`)
            .then(response=>setData(response.data))
            .catch(err=>console.log(err));
    },[id])

    const modData = e =>{
        const {name, value} = e.target;
        switch(name){
            case "Name":
                setData({...data,Name:value});
                break;
            case "Num":
                setData({...data,Num:value});
                break;
            case "Open":
                setData({...data,Open:!data.Open});
                break;
            default:
                console.log("Interesting...")
        }
    }

    const sendForm = e => {
        e.preventDefault();
        setError({})
        axios.put(`http://localhost:8000/api/stores/${data._id}/update`, data)
            .then(response=> navigate(`/stores/${response.data._id}`))  
            .catch(err=>{
                let temp = {}
                if(err.response.data.error.errors.Name)
                    temp.Name = "Name is less than 2 characters"
                if (err.response.data.error.errors.Num)
                    temp.Num = "Num cannot be 0"
                setError(temp);
                axios.get(`http://localhost:8000/api/stores/${id}`)
                    .then(response=>setData(response.data))
            })
    }

    return (
        <div>
            <Link to='/'>go back home</Link>
            <h2>Modify this store!</h2>
            <form onSubmit={sendForm}>
                <p>Store Name</p>
                <input type="text" name='Name' onChange={modData} value={data.Name}/>
                {error.Name? <p style={{color:"red"}}>{error.Name}</p>:""}
                <p>Store Number</p>
                <input type="number" name='Num' onChange={modData} value={data.Num}/>
                {error.Num? <p style={{color:"red"}}>{error.Num}</p>:""}
                <p>
                    <input type="checkbox" name='Open' onChange={modData} checked={data.Open}/>
                    Open?
                </p>
                <button type="submit">Edit store</button>
            </form>
        </div>
    )
}

export default ModifyStore