/* 
* <license header>
*/

import React from 'react'
import { NavLink } from 'react-router-dom'

function SideBar () {
  return (
    <ul className="SideNav">
      <li className="SideNav-item">
        <NavLink className="SideNav-itemLink" aria-current="page" to="/">Home</NavLink>
      </li>
      <li className="SideNav-item">
        <NavLink className="SideNav-itemLink" aria-current="page" to="/generate">Generate</NavLink>
      </li>
      <li className="SideNav-item">
        <NavLink className="SideNav-itemLink" aria-current="page" to="/edit/0">Edit</NavLink>
      </li>
      <li className="SideNav-item">
        <NavLink className="SideNav-itemLink" aria-current="page" to="/about">About Firefly Services</NavLink>
      </li>
    </ul>
  )
}

export default SideBar
