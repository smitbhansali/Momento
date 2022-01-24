import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const Signup = (props) => {
    const [creds, setCreds] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost:5000/api/auth/createuser"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({ name: creds.name, email: creds.email, password: creds.password })
        });
        const json = await response.json();
        console.log(json);
        setCreds({ name: "", email: "", password: "", cpassword: "" })
        if (json.success) {
            //redirect and save the auth token
            localStorage.setItem('token', json.authtoken)
            props.showalert("Account created successfully" , 'success')
            navigate('/login');
        }
        else {
            props.showalert("Invalid Details" , 'danger')
        }
    }
    const onchange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }
    return (
        <div className="container mt-5">
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input value={creds.name} type="text" className="form-control" name="name" id="name" onChange={onchange} required minLength={3} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input value={creds.email} type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" onChange={onchange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input value={creds.password} type="password" className="form-control" name="password" id="password" onChange={onchange} required minLength={6} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input value={creds.cpassword} type="password" className="form-control" name="cpassword" id="cpassword" onChange={onchange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
