import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from '../../commom/main';
import {getMarvel} from "../../commom/libs/apiCalls";
import picture from '../../assets/images/marvel.jpg';
import './details.css';
import {withRouter} from "react-router-dom";


class Details extends Component {
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
        let type = '';
        const id = this.props.match.params.id;

        if(this.props.match.url.match('characters') != null)
            type = 'characters';
        else if(this.props.match.url.match('creaters') != null)
            type = 'creators';
        else type = 'comics';

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
            <div className="padding">
                <div className="ui card fadeIn-animation card-image-details">
                    <div className="image image-details">
                        {details && <img src={this.getImage(details)} className="rounded img-thumbnail max-and-min-height" alt="Responsive image"/>}
                    </div>
                </div>

                <div className="card jumbotron jumbotron-background">
                    <div className="text-description">
                        <h1>{details && (details.title || details.name || details.fullName)}</h1>
                        {details && details.description && <p className="lead">{details.description}</p>}
                    </div>
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

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(withRouter(Details));