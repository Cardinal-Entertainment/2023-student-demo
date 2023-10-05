import React from 'react'
import '../assets/styles/styles.css'
import bonez_logo from '../assets/images/bonez_logo.png'
function LandscapeModal() {
  return (
    <div className="d-flex justify-content-center row">
      <div className="whole-container" style={{ width: "200%" }}>
        <img src={bonez_logo} style={{ width: "50%" }} alt="" />
        <h1 className="page-title light-blue-text">Rotate Device to Landscape Mode</h1>
      </div>
    </div>
  )
}

export default LandscapeModal