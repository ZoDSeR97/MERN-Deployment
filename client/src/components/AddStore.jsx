import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AddStore = () => {
    const [data, setData] = useState({
        Name: "",
        Num: 0,
        Open: false
    })
    const [error, setError] = useState({});
    const navigate = useNavigate();

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
        setError({});
        axios.post("http://localhost:8000/api/stores/new", data)
            .then(response=> navigate(`/stores/${response.data._id}`))  
            .catch(err=>{
                let temp = {}
                if(err.response.data.error.errors.Name)
                    temp.Name = "Name is less than 2 characters"
                if (err.response.data.error.errors.Num)
                    temp.Num = "Num cannot be 0"
                setError(temp);
            })
    }
    return (
        <div>
            <Link to='/'>go back home</Link>
            <h2>Add a new store</h2>
            <form onSubmit={sendForm}>
                <p>Store Name</p>
                <input type="text" name='Name' onChange={modData} />
                {error? <p style={{color:"red"}}>{error.Name}</p>:""}
                <p>Store Number</p>
                <input type="number" name='Num' onChange={modData} />
                {error? <p style={{color:"red"}}>{error.Num}</p>:""}
                <p>
                    <input type="checkbox" name='Open' onChange={modData} />
                    Open?
                </p>
                <button type="submit">Add a new store</button>
            </form>
        </div>
    )
}

export default AddStore