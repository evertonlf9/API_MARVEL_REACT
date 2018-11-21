import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import * as $ from 'jquery';
// import '../../node_modules/bootstrap/dist/js/bootstrap.min';
import './app.css';

import  React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';


import Routes from './routes'
import  Footer from '../commom/footer';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Routes/>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;