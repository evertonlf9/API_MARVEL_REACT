import './main.css';
import React, { Component } from 'react';
import Menu from '../menu';


class Main extends Component {

    render() {
        return (
            <React.Fragment>
                <Menu {...this.props}/>
                <main className="content container-fluid">
                    <div className="p-3 mt-3">
                        {this.props.children}
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default Main;