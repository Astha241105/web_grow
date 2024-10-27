import React from 'react'
import './otpWithMail.css'

const OtpWithMail = () => {
  return (
      <div id="container1">
      <img src=""></img>
      <h1>Enter the code</h1>
    <p>Enter the OTP we have sent to<br></br> abc@gmail.com.<br></br> Be careful not to share the code with anyone.</p>
      <input></input>
      <input></input>
      <input></input>
      <input></input><br></br>
      <button>Verify</button><br></br>
      <span>Didn't receive the code?</span><span id="gradient"> Resend code.</span></div>
  )
}

export default OtpWithMail
