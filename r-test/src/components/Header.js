// import { render } from 'react-dom';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router , Switch, Route, Link } from 'react-router-dom';

// import Used_Tool from './Used_Tool';
// import Clock from './Clock';
// import Login from './Login/Login';
import Assign from './Login/Assign';
import Board from './Board/Board';

// import App from '../App';
import './Header.css';
import './Btn.css';

import bonobono from '../img/bonobono.png';
import bonobonohover from '../img/bonobonohover.png';

import axios from 'axios';

axios.defaults.withCredentials = true;


const Home = lazy(() => import('../App'));
const Login = lazy(() => import('./Login/Login')); //lazy 로딩이 안되요 

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
    const [isLogin, setIsLogin] = useState(false);

    
    useEffect(() => {
        axios({
            method: "get",
            url: 'http://localhost:3001/'
        })
        .then(res => {
            if (res.data.isLoggedin){
                setNickname(res.data.name);
                setIsLogin(true);
            }
        })
        .catch(err => {
            console.error(err);
        });
    }, []);

    // useEffect(() => {
        
    //     if (sessionStorage.getItem('isLogin') === null) {
    //         // sessionStorage 에 id 라는 key 값으로 저장된 값이 없다면
    //         // console.log('isLogin ?? :: ', isLogin)
    //     } else {
    //         // sessionStorage 에 id 라는 key 값으로 저장된 값이 있다면
    //         // 로그인 상태 변경
            
    //         // console.log('isLogin ?? :: ', isLogin)

    //         // setNickname(JSON.parse(sessionStorage.getItem('useInfo')).name);
    //     }
    // })


    const onLogout = () => {
        // sessionStorage 에 id 로 저장되어있는 아이템을 삭제한다.

        axios({
            method: "get",
            url: 'http://localhost:3001/logout'
        })
        .then( res => {
            if (res.data.isLogout){
                alert('로그아웃 되었습니다.');
                setIsLogin(false); // 새로고침해서 필요없긴함 
                document.location.href = '/';  // App 으로 이동(새로고침)
            }
            else{
                alert('로그아웃에러');
            }
        })
        .catch(err => {
            console.error(err);
        });
        // sessionStorage.removeItem('isLogin');
        
    }

    return (
        <Router>
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
                        <span className="nav-item">
                            <Link className={scrollPosition < 30 ? "nav-link" : "change_nav-link"} to="/board">&nbsp;&nbsp;게시판</Link>
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
            <Suspense fallback={<div><div>Loading..</div></div>}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login}/>
                    <Route path="/assign" component={Assign} />
                    <Route path="/board" render={() => <Board nickname={nickname} isLogin={isLogin}/> } />
                </Switch>
            </Suspense>
        </Router>
    )

}
    
export default Header;
