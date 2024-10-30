import React from 'react'
import './otpWithPhone.css'

const OtpWithPhone = () => {
  return (
    <div id="contout2">
      <div id="container2">
      <h1 id="codephone">Enter the code</h1>
    <p id="mess2">Enter the 4-digit OTP we have sent to XXXXXXX521.</p>
      <input className="boxes2"></input>
      <input className="boxes2"></input>
      <input className="boxes2"></input>
      <input className="boxes2"></input>
      <br></br>
      <button id="verify2">Verify</button><br></br>
      <div className="didnt2">
      <span>Didn't receive the code?</span><span id="gradient2"> Resend code.</span></div></div></div>
  )
}

export default OtpWithPhone