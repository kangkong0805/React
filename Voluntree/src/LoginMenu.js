import React from 'react';
import { Link } from 'react-router-dom';
import './LoginMenu.css';
import Login from './Login';
import Register from './Register';
import ManagerLogin from './ManagerLogin';

class LoginMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoginOpen: false,
            isRegisterOpen: false,
            isManagerLoginOpen: false,
        }
    }

    loginOpen = () => {
        this.setState({
            isLoginOpen: true
        });
    };

    loginClose = () => {
        this.setState({
            isLoginOpen: false
        });
    };

    registerOpen = () => {
        this.setState({
            isRegisterOpen: true
        });
    };

    registerClose = () => {
        this.setState({
            isRegisterOpen: false
        });
    };

    managerLoginOpen = () => {
        this.setState({
            isManagerLoginOpen: true
        });
    };

    managerLoginClose = () => {
        this.setState({
            isManagerLoginOpen: false
        });
    };

    render() {
        return (
            <main>
                <div id="first-display">
                    <Link to="/"><img src="img/logo+text.png" /></Link>
                </div>
                <div className="loginitem">
                    <button type="button" id="mpbtn" className="navbtn" onClick={this.loginOpen}>로그인</button>
                    {this.state.isLoginOpen && <Login onClose={this.loginClose} />}
                    <button type="button" id="lobtn" className="navbtn" onClick={this.registerOpen}>회원가입</button>
                    {this.state.isRegisterOpen && <Register onClose={this.registerClose} />}
                    <button type="button" className="navbtn" onClick={this.managerLoginOpen}>관리자</button>
                    {this.state.isManagerLoginOpen && <ManagerLogin onClose={this.managerLoginClose} />}
                </div>
                <footer>
                    <span className="puppleline"/>
                </footer>
            </main>
        )
    }
}

export default LoginMenu;