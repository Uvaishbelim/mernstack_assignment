import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ApiCrud = () => {
    const [data, setData] = useState({
        name: "",
        age: "",
    });
    const [id, setId] = useState("")
    const [alldata, setAlllData] = useState([]);

    // disp() function Data page ko refresh kiye bina show ho jaye is liye h, wrna refresh krna pdta hai tabhi show hote h
    const disp = () => {
        axios.get("http://localhost:4000/users")
            .then((res) => setAlllData(res.data));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data, [name]: value,
        })
    }

    const saveData = (e) => {
        e.preventDefault();
        if (id !== "") {
            // Ye API link json file ko run krke jo open hota he google me wo hai 
            axios.put("http://localhost:4000/users/" + id, data)
                .then(() => {
                    console.log("Updated");
                    disp()
                });
        } else {

            //  Data insert
            axios.post("http://localhost:4000/users", data)
                .then(() => {
                    console.log("Inserted")
                    disp()
                })
        }
        setData({
            name: "",
            age: ""
        })
        setId("")
    };

    useEffect(() => {
        disp()
    }, []);

    const delData = (id) => {
        axios.delete("http://localhost:4000/users/" + id)
            .then(() => console.log("Deleted"))
        disp();
    }

    const editData = (id) => {
        axios.patch("http://localhost:4000/users/" + id)
            .then((res) => setData(res.data));
        setId(id)
    }

    return (
        <div>
            <form action="#" method="post" onSubmit={saveData}>
                Name :
                <input type="text" name="name" id="name" onChange={handleChange} value={data.name} /> <br /><br />
                Age :
                <input type="number" name="age" id="age" onChange={handleChange} value={data.age} /> <br /><br />
                <input type="submit" value="Save" /><br /><br />
            </form>
            <table border={2} width={600}>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Age</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {alldata.map((i) => {
                        return (
                            <tr>
                                <td>{i.id}</td>
                                <td>{i.name}</td>
                                <td>{i.age}</td>
                                <td>
                                    <button onClick={() => editData(i.id)}>Edit</button>
                                    <button onClick={() => delData(i.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ApiCrud