import React, { useContext, useState } from 'react'

import { message } from 'antd';
import { useAuth } from '../contexts/Authcontext.jsx';

const useSignup = () => {

const { login } = useAuth();
const [ error , setError] = useState(null);
const [loading, setLoading] = useState(null);

const registerUser = async(values) => {
    if(values.password !== values.confirmPassword){
        return setError('Passwords are not same');
    }
    try{
        setError(null);
        setLoading(null);
        let obj = {
            "name": values.name,
            "email": values.email,
            "password": values.password,
            "confirmPassword": values.confirmPassword
        }
        const res = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await res.json();
        if(res.status == 201){
            message.success(data.message);
           login( data.user, data.token);
        }else if(res.status ==400){
            setError(data.message);
        }else{
            message.error('Registration Failed');
        }

    }
    catch(error){
        message.error(error);
    }finally{
        setLoading(false);
    }

}
  return {loading, error, registerUser};
}

export default useSignup