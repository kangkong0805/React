import React from "react";
import axios from "axios";

class ChangePW extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            email: "",
            newPW: "",
            newPW_check: "",
            isPW: "",
        }
    }

     /* 아이디 입력창 핸들링 */
     handleID = e => {
        e.preventDefault();
        this.setState({
            id: e.target.value
        });
    };

     /* 이메일 입력창 핸들링 */
     handleEmail = e => {
        e.preventDefault();
        this.setState({
            email: e.target.value
        });
    };

    /* 새 비밀번호 입력창 핸들링 */
    handleNewPW = e => {
        e.preventDefault();
        this.setState({
            newPW: e.target.value
        });
    };

     /* 새 비밀번호 확인 입력창 핸들링 */
     handleCheckNewPW = e => {
        e.preventDefault();
        this.setState({
            newPW_check: e.target.value
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

        if (samePW(this.state.newPW_check) === false) {     // 비밀번호 유효성이 맞지 않을 때
            alert("영문, 숫자를 혼합하여 8~20자 이내로 작성해주세요.");
            this.setState({
                newPW: "",
                newPW_check: ""
            });
        }
        else if (this.state.newPW === this.state.newPW_check) { // 두 비밀번호 입력이 일치할 때
            alert("일치합니다.");
            this.setState({
                isPW: this.state.newPW_check
            });
        }
        else {                                            // 두 비밀번호 입력이 불일치할 때
            alert("비밀번호가 일치하지 않습니다.")
            this.setState({
                newPW: "",
            });
        }
    }

     /* 서버에 양식 제출*/
     handleSumbit = e => {
        e.preventDefault();

        const {
            id,
            email,
            newPW,
            newPW_check,
            isPW,
        } = this.state;

        if (
            id == "" ||
            email == "" ||
            newPW == "" ||
            newPW_check == ""
        ) {
            alert("입력값을 확인해주세요.");
        } else if(
            newPW === newPW_check &&
            newPW_check === isPW
        ) {
            axios.post('/v1/user/change/Password', {
                id: this.state.id,
                password: this.state.isPW,
            })
            .then((response) => {
                console.log(response.data);
            })
        }
    }

    render() {
        return (
            <div className="full_layer_changePW">
                <div className="login_layer">
                    <button className="closepopup" onClick={this.props.onClose}>
                        <span className="X1"></span>
                        <span className="X2"></span>
                    </button>
                    <img className="popuplogo" src="img/logo.png" />
                    <h3 className="logintext">아이디</h3>
                    <input type="text" placeholder="아이디를 입력하세요" 
                        onChange={this.handleID} value={this.state.id}/><br />
                    <h3 className="logintext">이메일</h3>
                    <input type="text" placeholder="비밀번호를 입력하세요" 
                        onChange={this.handleEmail} value={this.state.email}/><br />
                    <h3 className="logintext">새 비밀번호</h3>
                    <input type="text" placeholder="새 비밀번호를 입력하세요"
                        onChange={this.handleNewPW} value={this.state.newPW} /><br />
                    <h3 className="logintext">새 비밀번호 확인</h3>
                    <input type="text" placeholder="새 비밀번호를 다시 입력하세요" 
                        onChange={this.handleCheckNewPW} value={this.state.newPW_check}/><br />
                    <button onClick={this.checkPW}>중복체크</button>
                    <button className="check" onClick={this.handleSumbit}>아이디 찾기</button>
                </div>
            </div>
        );
    }
}

export default ChangePW;