import React from "react";
import "./login.css"

const Login = () => {
    return(
    <form>
        <div className="form-inner">
            <h2>LOGİN</h2>
            {/* ERROR! */}
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password"/>
            </div>
            <input type="submit" value="LOGİN"/><input type="submit" value="REGİSTER"/>
        </div>
    </form>
    )
}

export default Login