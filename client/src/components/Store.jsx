import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const Store = () => {
    const {id} = useParams();
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/stores/${id}`)
            .then(response=>setData(response.data))
            .catch(err=>console.log(err));
    },[id])

    return (
        <div>
            <Link to='/'>go back home</Link>
            <div>
                <h2>{data.Name}</h2>
                <h2>Store Number: {data.Num}</h2>
                <h2>{data.Open?"Open":"Close"}</h2>
            </div>
            <button onClick={()=>navigate(`/stores/edit/${data._id}`)}>Edit Store details</button>
        </div>
    )
}

export default Store