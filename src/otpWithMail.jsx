import React from 'react'
import './otpWithMail.css'

const OtpWithMail = () => {
  return (
       <div id="container1">
        <div id="codemail">Enter the code</div>
       <p id="mess1">Enter the OTP we have sent to<br></br> abc@gmail.com.<br></br> Be careful not to share the code with anyone.</p>
      <input className="boxes"></input>
      <input className="boxes"></input>
      <input className="boxes"></input>
      <input className="boxes"></input><br></br>
      <button className="verify1">Verify</button><br></br>
      <div className="didnt1">
      <span >Didn't receive the code?</span><span id="gradient1"> Resend code.</span></div></div>
  )
}

export default OtpWithMail
