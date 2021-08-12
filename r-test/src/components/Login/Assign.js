import React, { Component } from "react";
import axios from 'axios';
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
        this.handleConfirmPwdChange = this.handleConfirmPwdChange.bind(this);
        this.isDuplicated = this.isDuplicated.bind(this);

        this.state = {
            name: '',
            id: '',
            pwd: '',
            confirm_pwd: '',
            duplicated_p: ''
        };
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value })
    }
    handleIdChange(e) {
        this.setState({ id: e.target.value })   
    }
    handlePwdChange(e) {
        this.setState({ pwd: e.target.value })
    }
    handleConfirmPwdChange(e) {
        this.setState({ confirm_pwd: e.target.value })
    }
    isDuplicated(e){
        const id = this.state.id;

        axios({
            method: "post",
            url: 'http://localhost:3001/assign_duplicate',
            data: {
                id: id
            }
        })
            .then(res => {
                if (res.data.isduplicated == true) {
                    this.setState({ duplicated_p: '이미 존재하는 아이디 입니다.' })
                }
                else {
                    this.setState({ duplicated_p: '사용 가능한 아이디 입니다.' })
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

 

    render() {
        return (
            <div className="login-form">
                <form   >
                    <div>
                        <div className="assign_input">
                            <label className="legend">이름</label>
                            <input name="name" type="text" onChange={this.handleNameChange} placeholder="이름을 입력해주세요" />
                        </div>
                        <div className="assign_input">
                            <label className="legend">아이디</label>
                            <input name="id" type="text" onChange={this.handleIdChange} autoComplete="off" placeholder="사용하실 ID를 입력해주세요" />
                            <button className="btn duplicate_btn" type="button" onClick={this.isDuplicated}>중복확인</button>
                            <p className="duplicate_p">{this.state.duplicated_p}</p>
                        </div>
                        <div className="assign_input">
                            <label className="legend">비밀번호</label>
                            <input name="pwd" type="password" onChange={this.handlePwdChange} placeholder="사용하실 비밀번호를 입력해주세요" />
                        </div>
                        <div className="assign_input">
                            <label className="legend">비밀번호 확인</label>
                            <input name="pwd" type="password" onChange={this.handleConfirmPwdChange} placeholder="입력하신 비밀번호를 확인해주세요" />
                        </div>
                        <div className="assign_input">
                            <button className="btn" type="submit">로그인</button>
                        </div>
                    </div>
                </form>
            </div>


        );
    }

}
export default Login;