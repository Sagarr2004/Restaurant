import React from 'react'
import {useDispatch} from 'react-redux';
import authService from '../../appwrite/auth'
import {logout} from '../../appwrite/auth'

function LogoutButton() {
    const dispatch = useDispatch()
    const logoutHnadler = ()=>{
        authService.logout();
    }
  return (
    <div>LogoutButton</div>
  )
}

export default LogoutButton