import React from "react";
import "./register.css"

const Register = () => {
    return(
        <form>
            <div className="form-inner">
                <h2>REGİSTER</h2>
                {/* ERROR! */}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password"/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="name" name="name" id="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname:</label>
                    <input type="surname" name="surname" id="surname"/>
                </div>
                <div className="form-group">
                    <label htmlFor="weight">Weight:</label>
                    <input type="weight" name="weight" id="weight"/>
                </div>
                <div className="form-group">
                    <label htmlFor="height">Height:</label>
                    <input type="height" name="height" id="height"/>
                </div>
                <input type="submit" value="SAVE"/><input type="submit" value="LOGİN"/>
            </div>
        </form>
    )
}

export default Register