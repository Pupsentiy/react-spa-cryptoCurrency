import { Container } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Header/Header.scss'

const Header = () => {
  return (
    <Container className='container__header'>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/portfolio">Portfolio</NavLink>
    </Container>
  )
}

export default Header