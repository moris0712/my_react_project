import React, { Component } from "react";
import react_logo from '../img/react_logo.png';
import css_logo from '../img/css_logo.png';

class Used_Tool extends Component {

    render() {

        return (
            <div id="main_p2_div_div">
                <div id="main_p2_div">
                    <div id="main_p2">
                        <span >This is my first react project</span>
                    </div>
                    <br/>
                    <div>
                        <span>Used:  </span>
                        <br/>
                        <span className="logo_span" >
                            <span>React &nbsp;</span>
                            <img src={react_logo} className="App-logo logo" alt="logo" />
                        </span>
                        <span className="logo_span">
                            <span>Css&nbsp;</span>
                            <img id="css_logo" src={css_logo} className="Css-logo logo" alt="logo" />
                        </span>
                    </div>
                </div>
            </div>



        );
    }

}
export default Used_Tool;