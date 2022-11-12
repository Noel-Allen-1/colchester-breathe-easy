import React, {useState, setStatate} from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {register} from '../../services/user.service';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';


export default Register;

    


function Register(){
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage ] = useState("");
    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('Firstname is required'),
        lastname: Yup.string().required('Lastname is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
        email: Yup.string().required('Email is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors } = formState;


    const handleChange = (e) =>{
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        switch(name){
            case "firstname":
                setFirstname(value);
            break;
            case "lastname":
                setLastname(value);
            break;
            case "username":
                setUsername(value);
            break;
            case "email":
                setEmail(value);
            break; 
            case "password":
                setPassword(value);
            break;   
        }
    }


    const onSubmit = async (e) => {
        setError("");
        setMessage("");
        if(!firstname || !lastname || !username || !password || !email){
            return setError("All fields must be completed");
        }
        const post ={
            firstname:firstname,
            lastname:lastname,
            username:username,
            password:password,
            email:email
        }
        
        let response = await fetch('/api/users/register', {
            method: "POST",
            body:JSON.stringify(post)
        });
        let data = await response.json();
       
        if(data.success){
            setFirstname('');
            setLastname('');
            setUsername('');
            setPassword('');
            setEmail('');
            return setMessage(data.message);
        }else{
            return setError(data.message);
        }



    }
    return(
        <Container>
            <Row>
                <div className="col-md-6 offset-md-3 mt-5">
                    <div className="card">
                    <h4 className="card-header">Colchester Breathe Easy Registration Page</h4>
                        <div className="card-body">
                            <div>{message}</div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label>Firstname</label>
                                <input name="firstname" type="text" {...register('firstname')} onChange={handleChange} value={firstname} className={`form-control ${errors.firstname ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.firstname?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Lastname</label>
                                <input name="lastname" type="text" {...register('lastname')} onChange={handleChange} value={lastname} className={`form-control ${errors.lastname ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.lastname?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Username</label>
                                <input name="username" type="text" {...register('username')} onChange={handleChange} value={username} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.username?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" type="text" {...register('email')} onChange={handleChange} value={email} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.email?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input name="password" type="password" {...register('password')} onChange={handleChange} value={password} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                            <button disabled={formState.isSubmitting} className="btn btn-primary">
                                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Register
                            </button>
                            {errors.apiError &&
                                <div className="alert alert-danger mt-3 mb-0">{errors.apiError?.message}</div>
                            }
                        </form>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    );
}