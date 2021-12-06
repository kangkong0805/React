import React from "react";
import axios from 'axios';

class FindID extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
        }
    }

    /* 아이디 입력창 핸들링 */
    handleName = e => {
        e.preventDefault();
        this.setState({
            name: e.target.value
        });
    };

    /* 이메일 입력창 핸들링 */
    handleEmail = e => {
        e.preventDefault();
        this.setState({
            email: e.target.value
        });
    };

    /* 서버에 양식 제출*/
    handleSumbit = e => {
        e.preventDefault();

        const {
            id,
            email,
        } = this.state;

        if (
            id == "" ||
            email == ""
        ) {
            alert("값을 입력하세요.");
        } else {
            axios.post('/v1/user/find/Id', {
                mail: this.state.email,
                name: this.state.name,
            })
                .then((response) => {
                    console.log(response.data.result);
                    if (response.data.result == "등록된 이름이 없습니다.") {
                        this.setState({
                            name: ""
                        })
                    } else if(response.data.result == "메일이 일치하지 않습니다.") {
                        this.setState({
                            email: ""
                        })
                    } 
                })
        }
    }

    render() {
        return (
            <div className="full_layer_findID">
                <div className="login_layer">
                    <button className="closepopup" onClick={this.props.onClose}>
                        <span className="X1"></span>
                        <span className="X2"></span>
                    </button>
                    <img className="popuplogo" src="img/logo.png" />
                    <h3 className="logintext">이름</h3>
                    <input type="text" placeholder="이름을 입력하세요" 
                        onChange={this.handleName} value={this.state.name}/><br />
                    <h3 className="logintext">이메일</h3>
                    <input type="text" placeholder="이메일을 입력하세요" 
                        onChange={this.handleEmail} value={this.state.email}/><br />
                    <button className="check" onClick={this.handleSumbit}>아이디 찾기</button>
                </div>
            </div>
        );
    }
}

export default FindID;