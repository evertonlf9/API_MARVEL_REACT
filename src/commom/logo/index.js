import './logo.css';
import logo from '../../assets/images/logo.png';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Logo extends Component {
    render() {
        return (
            <aside className="logo">
                <Link to="/" className="logo">
                    <img src={logo} alt="logo"/>
                </Link>
            </aside>
        );
    }
}

export default Logo;