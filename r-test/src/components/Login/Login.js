import React, { Component } from "react";
import axios from 'axios';
import './Login.css';

class Login extends Component{

    constructor(props) {
        super(props);

        this.handleIdChange = this.handleIdChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);

        this.state = {
            id: '',
            pwd: ''
        };
    }


    handleIdChange(e) {
        this.setState({ id: e.target.value })
    }
    handlePwdChange(e) {
        this.setState({ pwd: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();

        const { id, pwd } = this.state;

        axios({
            method: "post",
            url: 'http://localhost:3001/login',
            data: {
                id: id,
                pwd: pwd
            }
        })
            .then( res => {
                console.log(res);
                console.log(res.data);
                console.log(res.data.message);
                if(res.data.isLoggedin == false){
                    alert(res.data.message);
                }
                else{
                    sessionStorage.setItem('id',id);
                    // 작업 완료 되면 페이지 이동(새로고침)
                    document.location.href = '/';
                }

                
            })
            .catch(err => {
                console.error(err);
            });
    };


    render(){
        return (
            <div className="login-form">
                <form onSubmit={this.handleSubmit} >
                    <div>
                        <div className="login_input">
                            <label className="legend">아이디</label>
                            <input name="id" type="text" onChange={this.handleIdChange} autoComplete="off" placeholder="ID"/>
                        </div>
                        <div className="login_input">
                            <label className="legend">비밀번호</label>
                            <input name="pwd" type="password" onChange={this.handlePwdChange} placeholder="PASSWORD"/>
                        </div>
                        <div className="login_input">
                            <button className="btn"  type="submit">로그인</button>
                        </div>
                    </div>
                </form>
            </div>


        );
    }

}
export default Login;