import React, { useState, useEffect } from 'react';
import logo from './logo.png';

const MyNavbar = () => {

    const [navbarColor, setNavbarColor] = useState('transparent');

    useEffect(() => {
        const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) {
            setNavbarColor('#222');
        } else {
            setNavbarColor('transparent');
        }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
  
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{width: "100%", backgroundColor: {navbarColor}}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                    <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top mx-3"/>
                    iTube</a>
                </div>
            </nav>
        </>
    );
}

export default MyNavbar;
