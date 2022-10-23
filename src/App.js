import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import womanSvg from "./assets/woman.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";



function App() {
  const [userInfo, setUserInfo] = useState([])
  const [desc, setDesc] = useState("")
  const [value, setValue] = useState({})
  const url = "https://randomuser.me/api/";
  const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

  const getUser = async () => {
    try {
      const { data: { results } } = await axios(url)
      console.log(results[0])
      const {
        picture: { large },
        name: { title, first, last },
        email,
        cell,
        location: { state, country },
        registered: { date, age },
        login: { username }
      } = results[0];
      setUserInfo({
        large,
        title,
        first,
        last,
        email,
        cell,
        state,
        country,
        date,
        age,
        username,
      });
      console.log(userInfo)
      setDesc("name")
      setValue(userInfo?.title, userInfo?.first, userInfo?.last)


    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser()


  }, [])

  const handleNew = (e) => {
    getUser()
    setDesc()
    setValue(e.target.value)
  }
  const handleClick = (e) => {
    setDesc("name")
    setValue(userInfo?.title, userInfo?.first, userInfo?.last)
  }
  const handleAdd = (e) => {
    console.log(e.target);
  }
  console.log(value)


  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={userInfo?.large} alt="random user" className="user-img" />
          <p className="user-title">My {desc} is {value[1]}</p>
          <p className="user-value"></p>
          <div className="values-list">
            <button className="icon" id="name" onClick={handleClick} value={userInfo?.title + " " + userInfo?.first + " " + userInfo?.last}>
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button className="icon" id="email" onClick={handleClick} value={userInfo?.email}>
              <img src={mailSvg} alt="mail" id="iconImg" value={userInfo?.email} />
            </button>
            <button className="icon" id="age" onClick={handleClick} value={userInfo?.age}>
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button className="icon" id="street" onClick={handleClick} value={userInfo?.state}>
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" id="phone" onClick={handleClick} value={userInfo?.cell}>
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" id="password" onClick={handleClick} value={userInfo?.username}>
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={handleNew}>
              new user
            </button>
            <button className="btn" type="button" onClick={handleAdd}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              <tr className="body-tr"></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
