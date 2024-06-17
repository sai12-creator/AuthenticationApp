import React from 'react'
import {Alert, Button, Card, Flex, Form, Spin, Typography} from 'antd';
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import '../App.css'

const Register = () => {
const {loading, error, registerUser} = useSignup();
const handleRegister = (values) =>{
    registerUser(values);
}
  return (
    <Card className='form-container'>
   <Flex>
    <Flex vertical flex={1}>
    <Typography.Title level={3} strong className='title'>
        create an account
    </Typography.Title>
    <Typography.Text type='secondary' strong className='slogan'>
       join for exclusive access!
    </Typography.Text>
    <Form layout='vertical' onFinish={handleRegister} autoComplete='off'>
        <Form.Item label='Full Name' name={'name'} rules={
            [{
                required: true,
                message: 'please input your full name'
            }]
        } >
             <input size={'large'} className={'customInput'} placeholder='Enter your Full Name'/>
        </Form.Item>
        <Form.Item label='Email' name={'email'} rules={
            [{
                required: true,
                message: 'please input your email'
            },{
                type: 'email',
                message: 'The input is not a valid email'
            }]
        } >
             <input size={'large'} className={'customInput'} placeholder='Enter your email'/>
        </Form.Item>
        <Form.Item label='Password' name={'password'} rules={
            [{
                required: true,
                message: 'please input your password'
            }]
        } >
             <input  className={'customInput'} size='large' placeholder='Enter your password'/>
        </Form.Item>
        <Form.Item label='Confirm Password' name={'confirmPassword'} rules={
            [{
                required: true,
                message: 'please input your confirm password'
            }]
        } >
             <input className={'customInput'} placeholder='re-enter your password'/>
        </Form.Item>
        {
            error && (
                <Alert
                description = {error}
                type = 'error'
                showIcon
                closable
                className='alert'
                />
            )
        }
        <Form.Item>
             <Button 
             type={`${loading}` ? "": 'primary'}
             htmlType='submit'
             size='large'
             className='btn'
             >
            {loading ? <Spin/> : 'Create Account'}
             </Button>
        </Form.Item>
        <Form.Item>
            <Link to='/login'>
             <Button 
             type='primary'
             size='large'
             className='btn'
             >Sign In
             </Button>
             </Link>
        </Form.Item>

    </Form>

    </Flex>
    <Flex>

    </Flex>
   </Flex>
    </Card>
  )
}

export default Register