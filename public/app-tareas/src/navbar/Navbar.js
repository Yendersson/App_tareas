import './Navbar.css';
import { NavLink } from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineClose} from 'react-icons/ai'
import { links } from './Navbar_Items';
import { useState } from 'react';

export const Navbar = ()=>{

    const [showNav, setShowNav] = useState(false);
    
    function showNavbar(){
        setShowNav(!showNav);
    }

    return(

        <>
        <div className='button__nav' onClick={showNavbar}>
            <GiHamburgerMenu />
        </div>
            <nav className={showNav? 'nav nav-show': 'nav'}>
                <div className='nav__container'>
                <ul className='nav__ul nav-show'>
                    <li onClick={showNavbar}>
                        <AiOutlineClose/>
                    </li>
                    {links.map((link, index) => {
                        return(
                            <li key={index} className={link.cName} onClick={showNavbar}>
                                <NavLink to={link.path}>{link.title}</NavLink>
                                <hr />
                                </li>
                                
                            )
                        }) }

                </ul>
                </div>
            </nav>
        </>

    )
}