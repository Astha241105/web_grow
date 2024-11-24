import React from 'react'
import "./login-popup.css"

const Loginpopup = () => {
  return (
    <div id="login-popup">
        <div className="login-request">Log in to continue your journey!</div>
        <button id="login-popup-button">Log In</button>
        <div className="login-request">
        <div id="login-request-register-1">Don't have an account?</div>
        <div id="login-request-register-2">Sign UP</div>

        </div>
      
    </div>
  )
}

export default Loginpopup
