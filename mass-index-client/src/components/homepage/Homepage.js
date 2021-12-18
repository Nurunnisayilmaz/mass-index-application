import React from "react";
import "./homepage.css"

const Homepage = () => {
    return(
        <form>
            <div className="form-inner">
                <h2>HOMEPAGE</h2>
                {/* ERROR! */}
                <div className="form-group">
                    <label htmlFor="weight">Weight:</label>
                    <input type="weight" name="weight" id="weight"/>
                </div>
                <div className="form-group">
                    <label htmlFor="height">Height:</label>
                    <input type="height" name="height" id="height"/>
                </div>
                <input type="submit" value="SAVE"/><input type="submit" value="LIST"/><input type="submit" value="LOGOUT"/>
            </div>
        </form>
    )
}

export default Homepage