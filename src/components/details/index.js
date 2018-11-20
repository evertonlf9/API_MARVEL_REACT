import React, { Component } from 'react';
import Main from '../../commom/main';
import {getMarvel} from "../../commom/apiCalls";
import picture from '../../assets/images/marvel.jpg';
import './details.css';


class Status extends Component {
    constructor(props){
        super(props);

        this.search = this.search.bind(this);
        this.getImage = this.getImage.bind(this);
    }

    componentWillMount() {
        this.search();
    }

    search (){
        this.setState({ loading: true });
        const type = this.props.match.url.match('characters') != null ? "characters" : "comics",
              id = this.props.match.params.id;

        getMarvel({ id, type })
            .then(({ data }) => {
                const details = data.length > 0 ? data[0] : {};
                this.setState({
                    details,
                });
            })
            .catch((error) => {});

    };

    getImage(details){
        if(details && details.thumbnail) {
            return details.thumbnail.path + '.' + details.thumbnail.extension;
        }
        return '';
    }

    createDescription(){
        const {details} = this.state;

        return(
            <div className="p-3 mt-4">
                <div className="ui card fadeIn-animation">
                    <div className="image">
                        {details && <img src={this.getImage(details)} className="rounded img-thumbnail max-height" alt="Responsive image"/>}
                    </div>
                </div>

                <div className="jumbotron">
                    <h1>{details && (details.title || details.name)}</h1>
                    {details && details.description && <p className="lead">{details.description}</p>}
                </div>
            </div>
        )
    }

    render(){
        const {details} = this.state;

        return(
            <Main>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {this.createDescription()}
                        </div>
                        <div className="col-12">
                            <div className="text-center">
                             {details && <img src={picture} width="300" />}
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
        )
    }
}

export  default Status;