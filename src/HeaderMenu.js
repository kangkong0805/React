import './App.css';
import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class HeaderMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: false,
    }
  }

  loginCheck = () => {
    const url = "/v1/loginCheck";
    axios.post(url, {})
      .then(({ data }) => {
        console.log(data.logged);

        if (data.logged == true) {
          this.setState({
            text: true
          });
        } else {
          this.setState({
            text: false
          })
        }
      })
      .catch(function (error) {
        console.log("실패");
      })
  };

  componentDidMount() {
    this.loginCheck();
  }

  Logout = () => {
    const url = "/v1/logout";
    axios.post(url, {})
      .then(({ data }) => {
        console.log(data.message);

        if (data.message == "로그아웃 되셨습니다.") {
          this.loginCheck();
        }
      })
      .catch(function (error) {
        console.log("실패");
      })
  };

  render() {

    return (
      <header>
        <nav className="container">
          <div className="item">
            <Link to="/"><img src="img/logo+text.png" className="logoimg" alt="Logo" /></Link> // 봉사신청 페이지로 이동
          </div>


          <div className="item">
            <ul className="navul">
              <Link to="/"><li className="navli">봉사신청</li></Link>
              <Link to="/나의화분"><li className="navli">나의 화분</li></Link>
              <Link to="/랭킹"><li className="navli">랭킹</li></Link>
              <Link to="/웹정보"><li className="navli">웹 정보</li></Link>

              {this.state.text ?
                (<a href="/"><li className="navli"><button type="button" id="mpbtn" className="navbtn" onClick={this.Logout}>로그아웃</button></li></a>)  // 로그인 또는 회원가입 했을 때
                : (<Link to="/시작페이지"><li className="navli"><button type="button" id="mpbtn" className="navbtn">로그인</button></li></Link>)          // 로그아웃 했을 때

              }
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

export default HeaderMenu;
