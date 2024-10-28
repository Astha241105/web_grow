import React from 'react'
import './otpWithPhone.css'

const OtpWithPhone = () => {
  return (
      <div id="container2">
      <h1 id="codephone">Enter the code</h1>
    <p id="mess2">Enter the OTP we have sent to<br></br> XXXXXXX521<br></br> Be careful not to share the code with anyone.</p>
      <input className="boxes2"></input>
      <input className="boxes2"></input>
      <input className="boxes2"></input>
      <input className="boxes2"></input>
      <br></br>
      <button id="verify2">Verify</button><br></br>
      <div className="didnt2">
      <span>Didn't receive the code?</span><span id="gradient2"> Resend code.</span></div></div>
  )
}

export default OtpWithPhone
