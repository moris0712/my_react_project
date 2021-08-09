import { render } from 'react-dom';
import React ,{ useState, useEffect } from 'react';
import { BrowserRouter, Switch, Router, Route, Link } from 'react-router-dom';


import Used_Tool from './Used_Tool';
import Clock from './Clock';
import Profile from './Profile';
import Login from './Login';

import App from '../App';
import './Header.css';

import bonobono from '../img/bonobono.png';
import bonobonohover from '../img/bonobonohover.png';

function Header() {
    const [scrollPosition, setScrollPosition] = useState(0); // 두 변수값을 0으로 선언
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }
    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
    });

    const [isHover,setisHover] = useState(false);

    

    return (
        <BrowserRouter>
            <header className={scrollPosition < 30 ? "original_header" : "change_header"}>
                <p id="Main" className={scrollPosition < 30 ? "nav-link" : "change_nav-link"} onMouseOver={() => setisHover(true)} onMouseOut={() => setisHover(false)}>My page<Link to="/"><img id="bonobono" src={isHover ? bonobonohover : bonobono} onMouseOver={() => setisHover(true)} onMouseOut={() => setisHover(false)} /></Link></p>
                <ul className="navbar-left">
                    <li className="nav-item">
                        <Link className={scrollPosition < 30 ? "nav-link" : "change_nav-link"} to="/login">로그인</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={scrollPosition < 30 ? "nav-link" : "change_nav-link"} to="/used_tool">회원가입</Link>
                    </li>

                </ul>

                <ul className="navbar-right">
                    <li className="nav-item">
                        <span className={scrollPosition < 30 ? "made" : "change_made"}>Made By&nbsp;&nbsp;</span><span className={scrollPosition < 30 ? "nav-link" : "change_nav-link"}> Junyoung Park</span>
                    </li>
                </ul>

            </header>
                <Route path="/" exact component={App} />
                <Route path="/login" component={Login}/>
                <Route path="/profile" component={Profile} />
        </BrowserRouter>
    )

}
    
export default Header;
