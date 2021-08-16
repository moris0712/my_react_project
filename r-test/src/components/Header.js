import { render } from 'react-dom';
import React ,{ useState, useEffect} from 'react';
import { BrowserRouter, Switch, Router, Route, Link } from 'react-router-dom';

import Used_Tool from './Used_Tool';
import Clock from './Clock';
import Profile from './Profile';
import Login from './Login/Login';
import Assign from './Login/Assign';

import App from '../App';
import './Header.css';
import './Btn.css';

import bonobono from '../img/bonobono.png';
import bonobonohover from '../img/bonobonohover.png';

import axios from 'axios';

function Header() {
    const [nickname, setNickname] = useState('');

    const [scrollPosition, setScrollPosition] = useState(0); // 두 변수값을 0으로 선언
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }
    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
    });

    const [isHover,setisHover] = useState(false);

    // 로그인 세션
    const [isLogin, setIsLogin] = useState(false)
    
    useEffect(() => {
        if (sessionStorage.getItem('id') === null) {
            // sessionStorage 에 id 라는 key 값으로 저장된 값이 없다면
            // console.log('isLogin ?? :: ', isLogin)
        } else {
            // sessionStorage 에 id 라는 key 값으로 저장된 값이 있다면
            // 로그인 상태 변경
            setIsLogin(true)
            // console.log('isLogin ?? :: ', isLogin)

            axios({
                method: "post",
                url: 'http://localhost:3001/profile',
                data: {
                    id: sessionStorage.getItem('id')
                }
            })
            .then(res => {
                setNickname(res.data.name);
            })
            .catch(err => {
                console.error(err);
            });
        }
    })

    const onLogout = () => {
        // sessionStorage 에 id 로 저장되어있는 아이템을 삭제한다.
        sessionStorage.removeItem('id')
        // App 으로 이동(새로고침)
        document.location.href = '/'
    }

    return (
        <BrowserRouter>
            <header className={scrollPosition < 30 ? "original_header" : "change_header"}>
                <p id="Main" className={scrollPosition < 30 ? "nav-link header_comp" : "change_nav-link header_comp"} onMouseOver={() => setisHover(true)} onMouseOut={() => setisHover(false)}>My page<Link to="/"><img id="bonobono" src={isHover ? bonobonohover : bonobono} onMouseOver={() => setisHover(true)} onMouseOut={() => setisHover(false)} /></Link></p>
                <div className="navbar-left header_comp">
                    <div>
                        <span className="nav-item">
                            {isLogin  ?
                                <span className={scrollPosition < 30 ? "nav-link" : "change_nav-link"} onClick={onLogout}>로그아웃</span>
                                :
                                <Link className={scrollPosition < 30 ? "nav-link" : "change_nav-link"} to="/login">&nbsp;&nbsp;&nbsp;&nbsp;로그인</Link>
                            }
                        </span>
                        <span className="nav-item">
                            {isLogin ?
                                <Link className={scrollPosition < 30 ? "nav-link" : "change_nav-link"} to="/used_tool">마이페이지</Link>
                                :
                                <Link className={scrollPosition < 30 ? "nav-link" : "change_nav-link"} to="/assign">&nbsp;&nbsp;회원가입</Link>
                            }
                        </span>
                    </div>
                </div>

                <ul className="navbar-right header_comp">
                    <li className="nav-item">
                        {isLogin ?
                            <span><span className={scrollPosition < 30 ? "made" : "change_made"}>어서오세요&nbsp;&nbsp;</span><span className={scrollPosition < 30 ? "nav-link" : "change_nav-link"}> {nickname}&nbsp;님</span></span>
                            :
                            <span><span className={scrollPosition < 30 ? "made" : "change_made"}>Made By&nbsp;&nbsp;</span><span className={scrollPosition < 30 ? "nav-link" : "change_nav-link"}> Junyoung Park</span></span>
                        }
                    </li>
                </ul>

            </header>
                <Route path="/" exact component={App} />
                <Route path="/login" component={Login}/>
                <Route path="/assign" component={Assign} />
        </BrowserRouter>
    )

}
    
export default Header;
