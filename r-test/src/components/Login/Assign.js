import React, { Component } from "react";
import axios from 'axios';
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);

        // this.handleNameChange = this.handleNameChange.bind(this);
        // this.handleIdChange = this.handleIdChange.bind(this);
        // this.handlePwdChange = this.handlePwdChange.bind(this);
        // this.handleConfirmPwdChange = this.handleConfirmPwdChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkPwd = this.checkPwd.bind(this);
        this.checkConfirmPwd = this.checkConfirmPwd.bind(this);
        this.checkId = this.checkId.bind(this);

        this.state = {
            name: '',
            id: '',
            pwd: '',
            confirm_pwd: '',
            duplicated_p: '',
            pwd_p: '',
            pwd_p2: '',
            pwd_ok: false,
            confirm_duplicated: false
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        });

        // console.log(e.target.name);

        if(e.target.name === 'id'){
            this.setState({ confirm_duplicated:false});
            setTimeout(this.checkId, 100);
        }
        else if (e.target.name === 'pwd' ){
            this.setState({ pwd_ok: false });
            setTimeout(this.checkPwd, 100);
        }
        else if (e.target.name === 'confirm_pwd'){
            this.setState({ pwd_ok: false });
            setTimeout(this.checkConfirmPwd, 100);
        }
    }


    checkPwd() {

        if (this.state.pwd === '' || this.state.pwd === null)
            this.setState({ pwd_p: '' })

        else{
            if (this.state.pwd.search(/\s/) !== -1){
                this.setState({ pwd_p: '공백이 포함되어있습니다.' })
                this.setState({ pwd_p2: '비밀번호를 확인해주세요.' })
            }
            else if (this.state.pwd === this.state.confirm_pwd  ) {
                this.setState({ pwd_p2: '비밀번호가 일치합니다.' })
                this.setState({ pwd_p: '' })
                this.setState({ pwd_ok: true })
            }
            else
                this.setState({ pwd_p: '' })

            if (this.state.pwd !== this.state.confirm_pwd )
                this.setState({ pwd_p2: '비밀번호가 불일치 합니다.' })
        }
    }
    checkConfirmPwd(){

        if (this.state.confirm_pwd === '' || this.state.confirm_pwd === null)
            this.setState({ pwd_p2: '' })

        else{

            if (this.state.confirm_pwd.search(/\s/) !== -1)
                this.setState({ pwd_p2: '공백이 포함되어있습니다.' })

            else if (this.state.pwd === this.state.confirm_pwd){
                this.setState({ pwd_p2: '비밀번호가 일치합니다.' })
                this.setState({ pwd_ok: true})
            }
            else{
                this.setState({ pwd_p2: '' })
            }

            if (this.state.pwd !== this.state.confirm_pwd)
                this.setState({ pwd_p2: '비밀번호가 불일치 합니다.' })
        }
            

        
    }

    checkId(){
        
        const id = this.state.id;

        const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

        if( id==='' || id===null )
            this.setState({ duplicated_p: '아이디를 입력해주세요.' })

        else if (id.search(/\s/) !== -1)
            this.setState({ duplicated_p: '공백은 포함될 수 없습니다.' })

        else if ( special_pattern.test(id))
            this.setState({ duplicated_p: '특수문자는 포함될 수 없습니다.' })

        else{
            axios({
                method: "post",
                url: 'http://localhost:3001/assign_duplicate',
                data: {
                    id: id
                }
            })
            .then(res => {
                if (res.data.isduplicated === true) {
                    this.setState({ duplicated_p: '이미 존재하는 아이디 입니다.' })
                }
                else {
                    this.setState({ duplicated_p: '사용 가능한 아이디 입니다.' })
                    this.setState({ confirm_duplicated: true })
                }
            })
            .catch(err => {
                console.error(err);
            });
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        const { name, id, pwd, pwd_ok, confirm_duplicated } = this.state;
        // console.log(this.state.name + ' ' + this.state.id + ' ' + this.state.pwd);
        
            if (name === '' || name === null || id === '' || id === null || pwd === '' || pwd === null )
                alert('모든 정보 칸을 입력해주세요');
            else if (!confirm_duplicated) 
                alert('사용 가능한 아이디를 입력해주세요.');
            else if (!pwd_ok)
                alert('비밀번호를 확인해주세요.');
            else{
                if(window.confirm('회원가입 하시겠습니까?')){
                    axios({
                        method: "post",
                        url: 'http://localhost:3001/assign',
                        data: {
                            name: name,
                            id: id,
                            pwd: pwd
                        }
                    })
                    .then(res => {
                        // console.log(res);
                        // console.log(res.data);
                        if (res.data.assign === true) {
                            alert('회원가입이 완료되었습니다.');
                            document.location.href = '/';
                        }
                        else {
                            alert('Something wrong');
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
                }
            }
            

    };

 

    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.handleSubmit} >
                    <div>
                        <div className="assign_input">
                            <label className="legend">이름</label>
                            <input name="name" type="text" onChange={this.handleChange} autoComplete="off" placeholder="이름을 입력해주세요" />
                        </div>
                        <div className="assign_input">
                            <label className="legend">아이디</label>
                            <input name="id" type="text" onChange={this.handleChange} autoComplete="off" placeholder="사용하실 ID를 입력해주세요" />
                            <p className={this.state.duplicated_p === '사용 가능한 아이디 입니다.' ? 'duplicate_green' : 'duplicate_red'}>{this.state.duplicated_p}&nbsp;</p>
                        </div>
                        <div className="assign_input">
                            <label className="legend">비밀번호</label>
                            <input name="pwd" type="password" onChange={this.handleChange} placeholder="사용하실 비밀번호를 입력해주세요" />
                            <p className="duplicate_red ">{this.state.pwd_p}&nbsp;</p>
                        </div>
                        <div className="assign_input">
                            <label className="legend">비밀번호 확인</label>
                            <input name="confirm_pwd" type="password" onChange={this.handleChange} placeholder="입력하신 비밀번호를 확인해주세요" />
                            <p className={this.state.pwd_p2 === '비밀번호가 일치합니다.' ? 'duplicate_green' : 'duplicate_red'}>{this.state.pwd_p2}&nbsp;</p>
                        </div>
                        <div className="assign_input">
                            <button className="btn" type="submit">회원등록</button>
                        </div>
                    </div>
                </form>
            </div>


        );
    }

}
export default Login;