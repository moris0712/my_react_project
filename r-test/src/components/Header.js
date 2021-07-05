import { render } from 'react-dom';
import React ,{ useState, useEffect } from 'react';
import { BrowserRouter, Switch, Router, Route, Link } from 'react-router-dom';
import Clock from './Clock';
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
                <ul class="navbar-left">
                    <li clssName="nav-item">
                        <Link className={scrollPosition < 30 ? "nav-link" : "change_nav-link"} to="/">프로필</Link>
                    </li>
                    <li clssName="nav-item">
                        <Link className={scrollPosition < 30 ? "nav-link" : "change_nav-link"} to="/clock">시계</Link>
                    </li>
                    <li clssName="nav-item">
                        <Link className={scrollPosition < 30 ? "nav-link" : "change_nav-link"} to="/clock">백준</Link>
                    </li>
                    <li clssName="nav-item">
                        <Link className={scrollPosition < 30 ? "nav-link" : "change_nav-link"} to="/clock">갤러리</Link>
                    </li>
                </ul>

                <ul class="navbar-right">
                    <li clssName="nav-item">
                        <Link className={scrollPosition < 30 ? "nav-link" : "change_nav-link"} to="/">Log In</Link>
                    </li>
                    <li clssName="nav-item">
                        <Link className={scrollPosition < 30 ? "nav-link" : "change_nav-link"} to="/">Sign Up</Link>
                    </li>
                </ul>

            </header>
                <Route path="/" exact component={App}/>
                <Route path="/clock" component={Clock} />
        </BrowserRouter>
    )

}
    
export default Header;
