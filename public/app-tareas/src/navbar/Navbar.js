import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { links } from './Navbar_Items';
import { useState } from 'react';

export const Navbar = () => {

    const [showNav, setShowNav] = useState(false);

    function showNavbar() {
        setShowNav(!showNav);
    }

    function logOut() {
        localStorage.removeItem('_id');
        localStorage.removeItem('token');

    }

    return (

        <>
            <header className='w-100 header d-flex justify-content-between'>

                <div className='button__nav' onClick={showNavbar}>
                    <GiHamburgerMenu className='button_nav-inside'/>
                </div>
                <div>
                    <h2>APP TASK</h2>
                </div>

                <div>
                    {!localStorage.getItem('_id')  &&
                        <a href="/">Sing in</a>
                    }
                    {localStorage.getItem('_id') && 
                    
                    <a onClick={logOut} href="/">
                        <button className='btn btn-danger'>Log out</button>
                    </a>
                    }
                </div>
            </header>
            <nav className={showNav ? 'nav nav-show' : 'nav'}>
                <div className='nav__container'>
                    <ul className='nav__ul nav-show'>
                        <li onClick={showNavbar}>
                            <AiOutlineClose />
                        </li>
                        {links.map((link, index) => {
                            return (
                                <li key={index} className={link.cName} >
                                    <NavLink to={link.path} onClick={showNavbar}>{link.title}</NavLink>
                                    <hr className='bg-light' />
                                </li>

                            )
                        })}
                    </ul>
                </div>
            </nav>
        </>

    )
}