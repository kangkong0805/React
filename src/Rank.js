import './App.css';
import React from 'react';
import { Link } from "react-router-dom";
import HeaderMenu from './HeaderMenu';
import axios from 'axios';

class Rank extends React.Component {

  getFruits = () => {
    axios.get("/v1/ranking")
      .then(({ data }) => {
        console.log(data);
      })
  }

  componentDidMount() {
    this.getFruits();
  }

  render() {
    return (
      <>
        <HeaderMenu />
        <main>
          <img src="img/empty.png" id="empty" />
        </main>
      </>
    )
  }
}

export default Rank;