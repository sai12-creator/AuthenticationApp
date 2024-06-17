import React from 'react'
import { useAuth } from '../contexts/Authcontext.jsx'
import { Button } from 'antd';

const Dashboard = () => {
    const {logout} = useAuth();
  return (
    <>
    <div>Dashboard</div>
    <Button onClick={logout}>Logout</Button>
    </>
  )
}

export default Dashboard