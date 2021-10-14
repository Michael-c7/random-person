import React from 'react';

import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'


function App() {
  const [loading, setLoading] = React.useState(true)
  const [person, setPerson] = React.useState(null)
  const [value, setValue] = React.useState("random person");
  const [title, setTitle] = React.useState("name");

  const fetchUser = async _ => {
    setLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    const person = data.results[0]
    const { phone, email } = person
    const { large: image } = person.picture
    const { password } = person.login
    const { first, last } = person.name
    const {
      dob: { age },
    } = person
    const {
      street: { number, name },
    } = person.location

    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    }
    

    setPerson(newPerson)
    setLoading(false)
    setTitle('name')
    setValue(newPerson.name)
  }
  
  React.useEffect(() => {
    fetchUser();  
  }, [])

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label
      setTitle(newValue)
      setValue(person[newValue])
    }
  }
  

  return (
    <div className="App">
      <section className="profile">
        <img className="profile__img" src={(person && person.image) || defaultImage} alt={`random user`}/>
        <div className="current-property-shown">My {title} is <h2>{value}</h2></div>
        <ul className="profile__icons">
            <li className="profile__icon" onMouseOver={handleValue}>
              <FaUser className="icon"/>
            </li>
            <li className="profile__icon" onMouseOver={handleValue}>
              <FaEnvelopeOpen className="icon" data-label='name'/>
            </li>
            <li className="profile__icon" onMouseOver={handleValue}>
              <FaCalendarTimes className="icon" data-label='email'/>
            </li>
            <li className="profile__icon" onMouseOver={handleValue}>
              <FaMap className="icon" data-label='street'/>
            </li>
            <li className="profile__icon" onMouseOver={handleValue}>
              <FaPhone className="icon" data-label='phone'/>
            </li>
            <li className="profile__icon" onMouseOver={handleValue}>
              <FaLock className="icon" data-label='password'/>
            </li>
        </ul>
        <button className="generate-user-btn" onClick={fetchUser}>{loading ? "Loading..." : "Random User"}</button>
      </section>
    </div>
  );
}

export default App;
