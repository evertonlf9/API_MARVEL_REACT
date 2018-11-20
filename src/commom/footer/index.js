import './footer.css';
import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <footer className="footer navbar-fixed-bottom">
                <div className="container">
                    <div className="navbar-footer">
                        &copy; 2018 by <a href="http://marvel.com/" target='_blank'>Marvel</a>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;