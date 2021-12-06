import './App.css';
import React from 'react';
import { Link } from "react-router-dom";

class Mainpage_Login extends React.Component {
  render() {
    return (
      <html>
        <header>
          <nav className="container">
            <div className="item">
              <Link to="/"><img src="img/logo+text.png" className="logoimg" alt="Logo" /></Link>
            </div>


            <div className="item">
              <ul class="navul">
                <li className="navli">나의 화분</li>
                <li className="navli">랭킹</li>
                <li className="navli">앱 정보</li>
              </ul>
            </div>


            <div className="item btnbox">
              <Link to="/loginCheck_false"><button type="button" id="lobtn" className="navbtn" onClick={() => alert('로그아웃 되셨습니다.')}>로그아웃</button></Link>
            </div>

          </nav>
        </header>
      </html>
    )
  }
}

export default Mainpage_Login;
