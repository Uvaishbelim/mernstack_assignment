import { useState } from "react";
import authService from "../services/authService";

function Register() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await authService.register(form);

            alert(res.data.message);

        } catch (error) {

            alert(error.response.data.message);

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <h2>Register</h2>

            <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
            />

            <br /><br />

            <button>

                Register

            </button>

        </form>

    );

}

export default Register;