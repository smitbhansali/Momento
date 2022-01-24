import React, {useState} from 'react'
import { useNavigate } from 'react-router'

const Login = (props) => {

    const [creds, setCreds] = useState({email:"", password:""})
    let navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost:5000/api/auth/login"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(creds)
        });
        const json = await response.json();
        console.log(json);
        setCreds({email:"", password:""})
        if (json.success)
        {
            //redirect and save the auth token
            localStorage.setItem('token', json.authtoken)
            props.showalert("Logged In successfully" , 'success')
            navigate('/');
        }
        else
        {
            props.showalert("Invalid Credentials" , 'danger')
        }
    }
    const onchange = (e)=>{
        setCreds({...creds,[e.target.name]:e.target.value})
    }
    return (
        <div className="container mt-5">
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input value={creds.email} onChange={onchange} type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input value={creds.password} onChange={onchange} type="password" className="form-control" name="password" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
