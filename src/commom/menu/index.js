import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

class Menu extends Component {

    render() {
        return (

            <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="container">
                    <div className="navbar-header" >
                        <a className="navbar-brand" href="#/" >Welcome to Marvel</a>
                        <a href="http://marvel.com/" target='_blank'>
                            <img src={logo} width="150px"/>
                        </a>
                    </div>
                </div>

                <div className="collapse navbar-collapse menu-nav" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/characters"  className="nav-link">
                                Characters
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/"  className="nav-link">
                                Comics <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/stories"  className="nav-link">
                                Stories<span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/creaters"  className="nav-link">
                                Creaters<span className="sr-only">(current)</span>
                            </Link>
                        </li>
                    </ul>
                </div>

            </nav>
        );
    }
}


export default Menu;