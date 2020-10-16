import React from "react";
import "./SignInForm.scss";
import {UserOutlined } from "@ant-design/icons";


export default function SignInForm() {
  return (
    <div className="login-content">
      <form>
        {/* <img src="img/avatar.svg" /> */}

        <div className="input-div one">
          <div className="i">
          <UserOutlined  style={{color:'#38d39f'}}/>
         
          </div>
          <div className="div">
            
            <input type="text" placeholder="Email" className="input tamano" />
          </div>
        </div>
        <div className="input-div pass">
          <div className="i">
          <UserOutlined  style={{color:'#38d39f'}}/>
          </div>
          <div className="div">
            
            <input type="password" placeholder="Password" className="input focus" />
          </div>
        </div>
        {/* <a >Forgot Password?</a> */}
        <input type="submit" className="btn" value="Login" />
      </form>
    </div>
  );
}
