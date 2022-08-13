import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {  Outlet } from 'react-router-dom';

function Protected() {
  const navigate=useNavigate();
  useEffect(() =>{
      if (localStorage.getItem("user") === null) {
        navigate('/');
      }
  },[])

  return (
    <Outlet/>
  )
}
export default Protected;