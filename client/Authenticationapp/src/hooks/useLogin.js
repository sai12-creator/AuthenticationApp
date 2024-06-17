import React, { useState } from 'react'

import { message } from 'antd';
import { useAuth } from '../contexts/Authcontext.jsx';

const useLogin = () => {

const { login } = useAuth();
const [ error , setError] = useState(null);
const [loading, setLoading] = useState(null);

const loginUser = async(values) => {
    // if(values.password !== values.confirmPassword){
    //     return setError('Passwords are not same');
    // }
    try{
        setError(null);
        setLoading(null);
        let obj = {
            "email": values.email,
            "password": values.password
        }
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await res.json();
        if(res.status == 200){
            message.success(data.message);
           login( data.user, data.token);
        }else if(res.status ==404){
            setError(data.message);
        }else if(res.status == 400){
             message.error("Invalid password")
        }else{
            message.error('Login Failed');
        }

    }
    catch(error){
        message.error(error);
    }finally{
        setLoading(false);
    }

}
  return {loading, error, loginUser};
}

export default useLogin;
