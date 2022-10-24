import React, { useEffect, useState } from "react";
import axios from "axios";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";



function App() {
  const [userInfo, setUserInfo] = useState([])
  const [desc, setDesc] = useState("name")
  const [value, setValue] = useState([])
  const [data, setData] = useState([])
  const url = "https://randomuser.me/api/";

  const getUser = async () => {
    try {
      const { data: { results } } = await axios(url)
      setUserInfo(results[0])
      setValue(`${results[0].name.title} ${results[0].name.first} ${results[0].name.last}`)


    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUser()
    const items = JSON.parse(localStorage.getItem('items'));
    console.log(items);
    if (items) {
      setData(items);
    }
  }, [])
  console.log(userInfo)

  const handleClick = (e) => {
    setDesc(e.target.id)
    setValue(e.target.alt)
  }
  const handleNew = () => {
    getUser()
    setDesc("name")
    setValue(`${userInfo?.name?.title} ${userInfo?.name?.first} ${userInfo?.name?.last}`)
  }
  const handleAdd = () => {
    const user = {
      name: `${userInfo?.name?.first}`,
      email: `${userInfo?.email}`,
      phone: `${userInfo?.cell}`,
      age: `${userInfo?.dob?.age}`,
      id: `${userInfo?.id.value}`
    }
    if ((data?.filter((item) => item.id === user.id)).length) {
      alert("Same User Clicked! ")
    } else {
      setData([...data, user])

    }

  }
  const handleClear = () => {
    setData([])

  }
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(data));
  }, [data])





  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={userInfo?.picture?.large} alt="random user" className="user-img" />
          <p className="user-title">My {desc} is </p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button className="icon" id="name" >
              <img src={userInfo?.gender === "female" ? womanSvg : manSvg} alt={userInfo?.name?.title + userInfo?.name?.first + userInfo?.name?.last} className="iconImg" onMouseOver={handleClick} id="name" />
            </button>
            <button className="icon" id="email"  >
              <img src={mailSvg} alt={userInfo?.email} className="iconImg" onMouseOver={handleClick} id="email" />
            </button>
            <button className="icon"  >
              <img src={userInfo?.gender === "female" ? womanAgeSvg : manAgeSvg} alt={userInfo?.dob?.age} className="iconImg" onMouseOver={handleClick} id="age" />
            </button>
            <button className="icon"  >
              <img src={mapSvg} alt={userInfo?.location?.state} className="iconImg" id="street" onMouseOver={handleClick} />
            </button>
            <button className="icon" >
              <img src={phoneSvg} alt={userInfo?.cell} className="iconImg" id="phone" onMouseOver={handleClick} />
            </button>
            <button className="icon"  >
              <img src={padlockSvg} alt={userInfo?.login?.username} className="iconImg" id="password" onMouseOver={handleClick} />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={handleNew}>
              new user
            </button>
            <button className="btn" type="button" onClick={handleAdd}>
              add user
            </button>
            <button className="btn" type="button" onClick={handleClear} >
              Clear All
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
              {data.length

                ? data.map((item, index) => {
                  // console.log(item, index);
                  const { name, email, phone, age } = item

                  return (<tr className="body-tr" key={index}>
                    <td className="th">{name}</td>
                    <td className="th">{email}</td>
                    <td className="th">{phone}</td>
                    <td className="th">{age}</td>
                  </tr>)
                })
                : ""
              }
            </tbody>
          </table>
        </div>
      </div >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main >
  );
}

export default App;
