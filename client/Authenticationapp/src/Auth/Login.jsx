import React from 'react'
import {Alert, Button, Card, Flex, Form, Spin, Typography} from 'antd';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import '../App.css'

const Login = () => {

    const {loading, error, loginUser} = useLogin();

    const handleLogin = async(values) =>{
       await loginUser(values);
    }

    return (
        <Card className='form-container'>
       <Flex>
        <Flex vertical flex={1}>
        <Typography.Title level={3} strong className='title'>
           sign In
        </Typography.Title>
        <Typography.Text type='secondary' strong className='slogan'>
           unlock you world!
        </Typography.Text>
        <Form layout='vertical' onFinish={handleLogin} autoComplete='off'>
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
                 <input size='large' className={'customInput'} placeholder='Enter your password'/>
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
                {loading ? <Spin/> : 'Sign In'}
                 </Button>
            </Form.Item>
            <Form.Item>
                <Link to='/'>
                 <Button 
                 type='primary'
                 size='large'
                 className='btn'
                 >Create an account
                 </Button>
                 </Link>
            </Form.Item>
    
        </Form>
    
        </Flex>
       </Flex>
        </Card>
      )
  
}

export default Login