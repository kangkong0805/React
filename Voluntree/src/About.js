import './App.css';
import HeaderMenu from './HeaderMenu';
import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { data } from 'jquery';

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: 0
    }
  }

  clickButton = () => {
    console.log(this.state.users);
  }

  getUsers = () => {
    axios.get("/v1/tree/count")
      .then(({ data }) => {
        console.log(data.result);
        this.setState({
          users: data.result
        })
      })
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <>
        <HeaderMenu />
        <main>
          <article className="about">
            <h1 className="about-title">현재 {this.state.users}개의 <br /> 나무들이 자라나고 있습니다.</h1>
            <p className="about-subtitle">선한 마음으로 봉사해주시는 모든 분들께 감사의 말씀 드립니다.</p>
            <p>volunTree는 봉사한 시간 단위에 따라서 나무를 키울 수 있는 프로젝트 입니다.<br />
              ‘봉사’ 라는 의미의 영단어 ‘volunteer’ 과 나무라는 의미의 영단어 ‘tree’를 조합해 만든 프로젝트 volunTree는<br />
              사람들이 봉사에 관심을 가지고, 자신이 봉사한 시간으로 나무를 키움으로써 성취감을 느낄 수 있습니다.<br />
              volunTree는 앞으로도 끊임없이 발전해 나가며, 더 좋은 서비스를 제공하겠습니다.<br />
              감사합니다.</p>
            <button onClick={this.clickButton}></button>
          </article>
        </main>
        <footer>
          <span className="puppleline" />
          <ul className="maker">
            <li> Copyright 2021. volunTree_team All rights reserved.</li>
            <li>Production : Jeayoung Jo, Kyeongmin Kang, Seryun Yang</li>
            <li>Github : https://github.com/dolong2/Donation_Tree</li>
          </ul>
        </footer>
      </>
    )
  }
}

export default About;