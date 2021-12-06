import React from 'react';
import { useHistory } from "react-router";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import FindID from './FindID';
import ChangePW from './ChangePW';

class Register extends React.Component {
    constructor(props) {
        super(props);

        /* 회원가입 정보 */
        this.state = {
            findID: false,      // 아이디 찾기 창
            changePW: false,    // 비밀번호 변경 창

            name: "",           // 이름
            id: "",             // 아이디
            pw: "",             // 비밀번호
            pw_check: "",       // 비밀번호 재입력
            email: "",          // 이메일
            isID: "",           // 아이디 중복확인
            isPW: "",           // 비밀번호 동일여부 확인
            isEmail: "",        // 이메일 중복확인
            result: false,
        };
    }

    find_ID = () => {
        this.setState({
            findID: !this.state.findID
        });
    };

    change_PW = () => {
        this.setState({
            changePW: !this.state.changePW
        });
    };

    /* 이름 입력창 핸들링 */
    handleName = e => {
        e.preventDefault();
        this.setState({
            name: e.target.value
        });
    };


    /* 아이디 입력창 핸들링 */
    handleID = e => {
        e.preventDefault();
        this.setState({
            id: e.target.value
        });
    };

    /* 아이디 중복 체크 */
    checkID = e => {
        e.preventDefault();

        const chkID = function (str) {
            var regID = /^.*(?=.{1,20})(?=.*[0-9a-zA-Z]).*$/;
            return regID.test(str) ? true : false;
        };

        if (chkID(this.state.id) === false) {
            alert("20자리 이하로 입력해주세요.");
            this.setState({
                id: ""
            });
        } else {
            axios.post("/v1/register/duplicate/Id", {
                id: this.state.id
            })
                .then((response) => {
                    if (response.data.result == true) {
                        alert("성공");
                        this.setState({
                            isID: this.state.id
                        })
                    } else {
                        alert("실패");
                    }
                })

        }
    }


    /* 비밀번호 입력창 핸들링 */
    handlePW = e => {
        e.preventDefault();
        this.setState({
            pw: e.target.value
        });
    };


    /* 비밀번호 확인 입력창 핸들링 */
    handlePW_check = e => {
        e.preventDefault();
        this.setState({
            pw_check: e.target.value
        });
    };

    /* 두 비밃번호 일치 여부 확인 */
    checkPW = e => {
        e.preventDefault();

        /* 비밀번호 유효성 검사 (영문, 숫자 혼합 8 ~ 20자리)*/
        const samePW = function (str) {
            var reg_pwd = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/; // 영문, 숫자, 혼합 8 ~ 20자리인지 판단
            return !reg_pwd.test(str) ? false : true;
        }

        if (samePW(this.state.pw_check) === false) {     // 비밀번호 유효성이 맞지 않을 때
            alert("영문, 숫자를 혼합하여 8~20자 이내로 작성해주세요.");
            this.setState({
                pw: "",
                pw_check: ""
            });
        }
        else if (this.state.pw === this.state.pw_check) { // 두 비밀번호 입력이 일치할 때
            alert("일치합니다.");
            this.setState({
                isPW: this.state.pw_check
            });
        }
        else {                                            // 두 비밀번호 입력이 불일치할 때
            alert("비밀번호가 일치하지 않습니다.")
            this.setState({
                pw_check: ""
            });
        }
    }

    /* 이메일 입력창 핸들링 */
    handleEmail = e => {
        e.preventDefault();
        this.setState({
            email: e.target.value
        });
    };

    checkEmail = e => {
        e.preventDefault();

        const chkEmail = function (str) {
            var reg_Email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            return reg_Email.test(str) ? true : false;
        };

        if (chkEmail(this.state.email) === false) {
            alert("이메일 형식이 유효하지 않습니다.");
            this.setState({
                email: ""
            });
        } else {
            axios.post("/v1/register/duplicate/mail", {
                mails: this.state.email
            })
                .then((response) => {
                    if (response.data.result == true) {
                        this.setState({
                            isEmail: this.state.email,
                        })
                        alert("이메일 인증에 성공하셨습니다.");
                    } else {
                        alert("이메일을 다시 입력해주세요.");
                    }
                })


        }
    }


    /* 서버로 회원가입 양식 제출 */
    handleSumbit = e => {
        e.preventDefault();

        const {
            name,
            id,
            pw,
            pw_check,
            email,
            isID,
            isPW,
            isEmail,
            result
        } = this.state;



        /* 확인 후 회원가입 여부 반환*/
        if (
            name &&
            id &&
            pw &&
            pw_check &&
            email &&
            id === isID &&
            pw === pw_check &&
            pw_check === isPW &&
            email === isEmail
        ) {
            axios.post('/v1/register', {
                id: this.state.isID,
                password: this.state.isPW,
                name: this.state.name,
                mail: this.state.isEmail,
            })
                .then((response) => {
                    console.log(response);
                    this.setState({
                        result: !result,
                    })
                    console.log(this.state.result);
                    alert("회원가입에 성공하셨습니다.");
                    document.location.href = '/시작페이지'
                })
        } else {
            alert("입력값을 확인해주세요");
        }

    };


    render() {
        const {
            name, id, pw, pw_check, email
        } = this.state;

        return (
            <div className="full_layer">
                <div className="signup_layer">
                    <button className="closepopup" onClick={this.props.onClose}>
                        <span className="X1"></span>
                        <span className="X2"></span>
                    </button>
                    <img className="popuplogo" src="img/logo.png" />
                    <h3 className="popuptext">이름</h3>
                    <input className="popupinput" type="text" placeholder="이름을 입력하세요"
                        onChange={this.handleName} value={name} /><br />
                    <h3 className="popuptext">아이디</h3>
                    <input classID="popupinput" type="text" placeholder="아이디를 입력하세요"
                        onChange={this.handleID} value={id} /><br />
                    <button onClick={this.checkID} className="sidebutton">중복확인</button>
                    <h3 className="popuptext">비밀번호</h3>
                    <input classPW="popupinput" type="password" placeholder="비밀번호를 입력하세요"
                        onChange={this.handlePW} value={pw} /><br />
                    <h3 className="popuptext">비밀번호 확인</h3>
                    <input className="popupinput" type="password" placeholder="비밀번호를 다시 입력하세요"
                        onChange={this.handlePW_check} value={pw_check} /><br />
                    <button onClick={this.checkPW} className="sidebutton">비번확인</button>
                    <h3 className="popuptext">이메일</h3>
                    <input className="popupinput" type="text" placeholder="이메일을 입력하세요"
                        onChange={this.handleEmail} value={email} /><br />
                    <button onClick={this.checkEmail} className="sidebutton">중복화인</button>

                    <button className="check" onClick={this.handleSumbit}>회원가입</button>
                   
                </div>

            </div>
        );
    }
}

export default Register;