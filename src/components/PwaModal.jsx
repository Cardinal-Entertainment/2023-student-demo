import React from 'react'
import '../assets/styles/styles.css'
// import install_prompt_icon from '../assets/images/install_prompt_icon.svg'
function PwaModal(props) {
  return (
    <div className="d-flex justify-content-center row">
      <div className="whole-container" style={{ width: "200%" }}>
        {/* <img src={install_prompt_icon} style={{ width: "50%" }} alt="" /> */}
        <h1 className="page-title light-blue-text">Add Zoombies To Homescreen</h1>
        <br></br>
        <h1 className="page-subtitle" style={{ color: "white" }}>Install the Zoombies app for enhanced game experience.</h1>
        <h1 className="page-subtitle" style={{ color: "white" }}>
          {props.isSafari &&
            "In your Safari browser menu, tap the Share icon and choose Add to Home Screen in the options. Then open the app from your home screen."}
          {props.isChrome && "In your Chrome browser menu tap the More button and choose Install App in the options"}
        </h1>
      </div>

    </div>
  )
}

export default PwaModal