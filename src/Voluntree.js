import './App.css';
import { Link } from "react-router-dom";
import React, { Component } from 'react';
import axios from 'axios';
import HeaderMenu from './HeaderMenu';

class Voluntree extends React.Component {
    constructor() {
        super();

        this.state = {
            isDropDown: false,  // 지역선택 창 내림 여부
            text: "지역",       // 선택지역 
            local1: "서울특별시",
            local2: "부산광역시",
            local3: "인천광역시",
            local4: "대전광역시",
            local5: "대구광역시",
            local6: "울산광역시",
            local7: "광주광역시",
            local8: "세종특별자치시",
            local9: "경기도",
            local10: "강원도",
            local11: "충청도",
            local12: "경상도",
            local13: "전라도",
            local14: "제주특별자치도",

            locals: ["서울특별시", "부산광역시", "인천광역시", "대전광역시", "대구광역시", "울산광역시", "광주광역시", "세종특별자치시",
                "경기도", "강원도", "충청도", "경상도", "전라도", "제주특별자치도"],

            volunteerList: [],
            id: 1,
            isApply: false,
        };
    }

    applyPopup = () => {
        this.setState({
            isApply: !this.state.isApply,
        });
    };

    // 드롭다운
    dropDown = e => {
        e.preventDefault();
        this.setState({
            isDropDown: !this.state.isDropDown,
        });
    };

    // 지역선택
    changeText = e => {
        console.log('/v1/volunteer/list/' + e);
        this.setState({
            text: e,
            isDropDown: !this.state.isDropDown,
        });

        axios.get('/v1/volunteer/list/' + e, {})
            .then((response) => {
                console.log(response.data)
                this.setState({
                    volunteerList: response.data
                });
            })
    };

    searchAPI = () => {
        const url = "/v1/volunteer/list";
        axios.get(url)
            .then(({ data }) => {
                console.log("성공");

                this.setState({
                    volunteerList: data,
                });
                console.log(data);
            })
            .catch(function (error) {
                console.log("실패");
            })
        // this.a(this.searchAPI.response.data);

    };

    componentDidMount() {
        this.searchAPI();
    }

    printConsole = e => {

        axios.post('/v1/volunteer/participate', {
            volunteer_id: e.volunteer_id,
            volunteer_name: e.name,
        })
            .then(({ data }) => {
                console.log(data.participate);
                if (data.participate == "로그인 되지 않았습니다") {
                    alert(data.participate);
                } else if (data.participate == "이미 신청한 봉사 입니다") {
                    alert("이미 신청한 봉사입니다");
                } else {
                    window.open('https://www.1365.go.kr/vols/1572247923954/partcptn/onlinePartCptn.do?type=show&progrmRegistNo=' + e.volunteer_id);
                    // document.location.href = 'https://www.1365.go.kr/vols/1572247923954/partcptn/onlinePartCptn.do?type=show&progrmRegistNo=' + e.volunteer_id
                }
            })
    }

    loginCheck = () => {
        const url = "/v1/loginCheck";
        axios.post(url, {})
            .then(({ data }) => {
                console.log(data.logged);

                if (data.logged == true) {
                    document.location.href = '/'
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



    render() {
        // const names = this.state.name
        // const lists = names.map((list, index) => (<li key={index}>{list}</li>));
        const { volunteerList, locals } = this.state

        return (
            <>
                <HeaderMenu />
                <main>
                    <aside>
                        <div id="localchoice">
                            <h2>지역 선택</h2>
                            <span className="pupple_line" />


                            {this.state.isDropDown ?
                                (<ul>
                                    {locals.map((local, index) => {
                                        return (
                                            <>
                                                <li className="locallist" onClick={() => { this.changeText(local) }}>{local}</li>
                                                <span className="gray" />
                                            </>
                                        );
                                    })}
                                </ul>
                                ) : (
                                    <div onClick={this.dropDown}>
                                        <h4>{this.state.text}</h4>
                                        <button />
                                    </div>)}
                        </div>
                    </aside>
                    <section className="volunteerlist">
                        <ul>
                            {volunteerList.map((list, index) => {
                                return (
                                    <a target="_blank">
                                        <li className={"list"+index} num={index} onClick={() => { this.printConsole(list) }}>
                                            <h1 >{list.name}</h1>
                                            <p >{list.field}</p>
                                            <p >{list.begin_date}</p>
                                            <p >{list.end_date}</p>
                                        </li>
                                    </a>
                                );
                            })
                            }
                        </ul>

                    </section>
                </main>
            </>
        )
    }
}

export default Voluntree;

// href={"https://www.1365.go.kr/vols/1572247923954/partcptn/onlinePartCptn.do?type=show&progrmRegistNo=" + list.volunteer_id}