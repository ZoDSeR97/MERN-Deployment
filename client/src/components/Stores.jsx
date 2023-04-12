import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Stores = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8000/api/stores")
            .then(response => setData(response.data))
            .catch(err => console.log(err));
    },[])

    const removeRecord = (id)=>{
        axios.delete(`http://localhost:8000/api/stores/${id}/delete`)
            .then(setData(data.filter(record=>record._id!==id)))
            .catch(err=>console.log(err));
    }

    return (
        <div>
            <h2>Find stores in your area!</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">Store</th>
                        <th scope="col">Store Number</th>
                        <th scope="col">Open</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map(store=>
                            <tr key={store._id}>
                                <td><Link to={`/stores/${store._id}`}>{store.Name}</Link></td>
                                <td>{store.Num}</td>
                                <td>{store.Open?"True":"False"}</td>
                                {store.Open?<Link className='btn bg-danger' onClick={()=>removeRecord(store._id)}>Remove</Link>:""}
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <button onClick={()=>navigate('/stores/add')}>Can't find your store?</button>
        </div>
    )
}

export default Stores;