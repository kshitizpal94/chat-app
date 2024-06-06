import { Nav, Container,Navbar, Stack, } from "react-bootstrap"
import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"
import Notifications from "./Chat/Notifications"

const NavBar = () => {
    const {user, logoutUser} = useContext(AuthContext);
  return (
    <Navbar bg='dark' className='mb-3' style={{height :"4rem"}}>
        <Container>
            <h2>
                <Link to={'/'} className="link-light text-decoration-none">Chat App</Link>
            </h2>
            {user && <span>Logged in as {user.name}</span>}
            <Nav >
                {!user && 
                <>
                    <Stack direction="horizontal" gap={4}>
                        <Link to='/login' className='link-light text-decoration-none'>Login</Link>
                        <Link to='/register' className='link-light text-decoration-none'>Register</Link>
                    </Stack>
                </>}
                {
                    user && 
                    <>
                        <Stack direction="horizontal" gap={3}>
                        <Notifications/>
                        <Link onClick={logoutUser} className='link-light text-decoration-none'>Logout</Link>
                        </Stack>
                    </>
                }
            </Nav>
        </Container>
    </Navbar>
  )
}

export default NavBar
