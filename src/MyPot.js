import './App.css';
import React from 'react';
import { Link } from "react-router-dom";
import HeaderMenu from './HeaderMenu';
import Voluntree from './Voluntree';
import axios from 'axios';

class MyPot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            journal: [],
            volunteer_id: "",
            title: "",
            content: "",
            begin_hour: "",
            end_hour: "",
            id: 0,

            volunteerList: [],
            isTree: "ground.png"
        }
    }

    handleBeginHour = e => {
        this.setState({
            begin_hour: e.target.value
        });
    };

    handleEndHour = e => {
        this.setState({
            end_hour: e.target.value
        });
    };

    handleTitle = e => {
        this.setState({
            title: e.target.value
        });
    };

    handleContent = e => {
        this.setState({
            content: e.target.value
        });
    };

    addJournal = () => {
        console.log(this.state.volunteer_id);

        axios.post("/v1/volunteer/diary", {
            volunteer_id: this.state.volunteer_id,
            title: this.state.title,
            content: this.state.content,
            begin_hour: this.state.begin_hour,
            end_hour: this.state.end_hour,
        })
            .then(({ data }) => {
                console.log(data.volunteer_diary);
                if (data.volunteer_diary == "신청하지 않은 봉사입니다") {
                    alert("신청한 봉사를 선택해주세요");
                    this.setState({
                        volunteer_id: "",
                        title: "",
                        content: "",
                        begin_hour: "",
                        end_hour: "",
                    })
                } else {
                    alert(data.volunteer_diary);
                }
            })
    };

    searchAPI = () => {
        const url = "/v1/volunteer/participate";
        const {
            volunteerList,
            volunteer_id,
            name,
            field,
            begin_date,
            end_date,
            id
        } = this.state;
        axios.get(url)
            .then(({ data }) => {
                console.log(data);
                this.setState({
                    volunteerList: data,
                });
                // console.log(volunteerList);
            })
            .catch(function (error) {
                console.log("실패");
            })
        // this.a(this.searchAPI.response.data);

    };

    getTree = () => {
        axios.get('/v1/volunteer/Tier')
            .then(({data}) => {
                console.log(data);
                this.setState({
                    isTree: data.tree_tier
                })
                console.log("img/Tree"+ this.state.isTree)
            })
    }

    componentDidMount() {
        this.searchAPI();
        this.itIsFunction();
        this.getTree();
    }

    itIsFunction = () => {
        axios.get("/v1/volunteer/Tier")
            .then((response) => {
                console.log(response);
            })
    }

    sumbitLog = e => {
        this.setState({
            volunteer_id: e.volunteer_id
        })
        console.log(this.state.volunteer_id);
    }

    render() {
        const {
            volunteer_id, title, content, begin_hour, end_hour, volunteerList
        } = this.state;

        return (
            <>
                <HeaderMenu />

                <main>
                    <section className="mypotlist">
                        <div className="diary">
                            <span className="treeimg" src={"img/Tree"+ this.state.isTree}>
                                <img src="img/ground.png" />
                            </span>
                            <h1>나의 열매 120개</h1>
                            <Link to="/쇼핑하기"><img src="img/shoping.png" className="shoping" /></Link>
                            <span className="line" />
                            <div className="diarytext">
                                <input placeholder="시작 시간을 입력하세요 (9시일 경우: 9)" value={begin_hour}
                                    text="text" onChange={this.handleBeginHour} />
                                <input placeholder="끝난 시간을 입력하세요 (14시일 경우: 14)" value={end_hour}
                                    text="text" onChange={this.handleEndHour} />
                                <input placeholder="제목을 입력하세요" value={title}
                                    text="text" onChange={this.handleTitle} />
                                <input placeholder="일지를 입력하세요" value={content}
                                    text="text" onChange={this.handleContent} />

                            </div>
                            <button onClick={this.addJournal}>등록하기</button>
                        </div>
                        <ul>
                            {
                                volunteerList.map((list, index) => {
                                    return (
                                        <li className="list" onClick={() => { this.sumbitLog(list) }}>
                                            <h3>{list.volunteer_title}</h3>
                                        </li>
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

export default MyPot;
