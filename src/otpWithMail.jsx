import React from 'react'
import './otpWithMail.css'

const OtpWithMail = () => {
  return (
    <div  id="contout">
      
       <div id="container1">
        <div id="codemail">Enter the code</div>
       <p id="mess1">Enter the 4-digit OTP code we have sent to abc@gmail.com.</p>
      <input className="boxes"></input>
      <input className="boxes"></input>
      <input className="boxes"></input>
      <input className="boxes"></input><br></br>
      <button className="verify1">Verify</button><br></br>
      <div className="didnt1">
      <span >Didn't receive the code?</span><span id="gradient1"> Resend code.</span></div></div></div>
  )
}

export default OtpWithMail
