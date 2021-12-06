import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FindID from './FindID';
import ChangePW from './ChangePW';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            findID: false,
            changePW: false,

            id: "",             // 아이디
            pw: ""              // 비밀번호
        }
    }

    /* 아이디 찾기창 */
    find_ID = () => {
        this.setState({
            findID: !this.state.findID
        });
    };

    /* 비밀번호 변경창*/
    change_PW = () => {
        this.setState({
            changePW: !this.state.changePW
        });
    };

    /* 아이디 입력창 핸들링 */
    handleID = e => {
        e.preventDefault();
        this.setState({
            id: e.target.value
        });
    };

    /* 비밀번호 입력창 핸들링 */
    handlePW = e => {
        e.preventDefault();
        this.setState({
            pw: e.target.value
        });
    };

    /* 서버에 양식 제출*/
    handleSumbit = e => {
        e.preventDefault();

        const {
            id,
            pw,
        } = this.state;

        if (
            id != "" &&
            pw != ""
        ) {
            axios.post('/v1/login', {
                id: this.state.id,
                password: this.state.pw,
            })
                .then((response) => {
                    if (response.data.login == "로그인 완료") {
                        alert(response.data.login);
                        document.location.href = '/'
                    } else {
                        alert(response.data.login);
                        this.setState({
                            pw: ""
                        })
                    }
                })
        } else {
            alert("입력값이 존재하지 않습니다.");
        }
    }

    /* 로그인 시*/

    render() {
        return (
            <div className="full_layer">
                <div className="login_layer">
                    <button className="closepopup" onClick={this.props.onClose}>
                        <span className="X1"></span>
                        <span className="X2"></span>
                    </button>
                    <img className="popuplogo" src="img/logo.png" />
                    <h3 className="logintext">아이디</h3>
                    <input className="popupinput" type="text" placeholder="아이디를 입력하세요"
                        onChange={this.handleID} value={this.state.id} /><br />
                    <h3 className="logintext">비밀번호</h3>
                    <input className="popupinput" type="password" placeholder="비밀번호를 입력하세요"
                        onChange={this.handlePW} value={this.state.pw} /><br />
                    <button className="check" onClick={this.handleSumbit}>로그인</button>
                    <p onClick={this.find_ID}>아이디가 기억나지 않으신가요?</p>
                    {this.state.findID && <FindID onClose={this.find_ID} />}
                    <p onClick={this.change_PW}>비밀번호가 기억나지 않으신가요?</p>
                    {this.state.changePW && <ChangePW onClose={this.change_PW} />}
                </div>
            </div>
        );
    }
}

export default Login;