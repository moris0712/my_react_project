import React, { Component } from "react";
import './Login.css';

class Login extends Component {

    render() {

        return (
            <div>
                <form action="/login" id="login-form" method="post">

                    <label class="legend">아이디</label>

                    <input name="id" type="text" placeholder="ID"/>

                    <label class="legend">패스워드</label>
                    <input name="pwd" type="password" placeholder="PASSWORD"/>
                    <button class="login_btn">로그인</button>

                </form>
            </div>


        );
    }

}
export default Login;