import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Main from '../../commom/main';
import { getMarvel } from '../../commom/apiCalls';
import Paginator from '../../commom/paginator';
import Loading from '../../commom/loading';

class Character extends Component {
    constructor(props){
        super(props);

        this.search = this.search.bind(this);
        this.moreInfo = this.moreInfo.bind(this);
        this.getImage = this.getImage.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNextPages = this.handleNextPages.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePreviousPages = this.handlePreviousPages.bind(this);
        this.handleSelectOrderByChange = this.handleSelectOrderByChange.bind(this);
        this.createOrderBy = this.createOrderBy.bind(this);
        this.createListComics = this.createListComics.bind(this);

        this.state = {
            limits: [20, 40, 60, 100],
            orderBy:[
                {value: "name", label: "Name ASC."},
                {value: "modified", label: "Modificado ASC."},
                {value: "-name", label: "Name DESC"},
                {value: "-modified", label: "Modificado DESC."}
            ],
            filters: {
                title: "",
                type: 1
            },
            sortName: '',
            characters: [],
            page: 0,
            maxPage: 0,
            limitPerPage: 20,
            exactMatch: false,
            loading: false,
            data: [],
        }
    }

    componentWillMount() {
        this.search();
    }

    search (options){

        this.setState({ loading: true });
        const {limitPerPage, filters, exactMatch} = this.state;

        const {page, title, limit, type, sortName,
        } = Object.assign({
            page: 1,
            type: "characters",
            title: filters.title,
            sortName: this.state.sortName,
            limit: limitPerPage,
            exactMatch: exactMatch
        }, options);

        const offset = page ? (page - 1) * limit : 0;

        getMarvel({ offset, title, sortName, limit, type, exactMatch })
            .then(({ data, maxPage }) => {

                this.setState({
                    data,
                    maxPage,
                    page: data.length ? page : 0,
                    loading: false
                });

            })
            .catch((error) => {});

    };

    moreInfo(comic, e){
        this.props.history.push('/characters/' + comic.id);
    }

    getImage(comic){

        if(comic.thumbnail) {
            return comic.thumbnail.path + '.' + comic.thumbnail.extension;
        }

        return '';
    }

    handleNameChange (evt) {
        this.setState({filters: {...this.state.filters, title: evt.target.value} });
    }

    handleSelectChange (event) {
        this.setState({...this.state, limitPerPage: event.target.value});
        this.search({limitPerPage: event.target.value });
    }

    handleSelectOrderByChange(event){
        this.setState({...this.state, sortName: event.target.value});
        this.search({sortName: event.target.value});
    }

    handleNextPages(maxPage){
        this.handlePageChange(maxPage + 1);
    }

    handlePreviousPages(minPage){
        if (minPage > 1) {
            this.handlePageChange(minPage - 1)
        }
    }

    handlePageChange(page){
        this.setState({...this.state, page});
        this.search({page});
    }

    createSelectLimit(){
        const {limits, limitPerPage} = this.state;
        return (
            <span className="result-limit-characters">
                <label className="result-limit-label">Result Limit:</label>
                <select name="sub_type" className="form-control"  onChange={this.handleSelectChange} value={limitPerPage} disabled={this.state.loading}>
                    {
                        limits.map((value)=> <option key={value} value={value}>{value}</option>)
                    }
                </select>
            </span>
)
    }

    createOrderBy(){

        const {orderBy, sortName} = this.state;
        return (
            <span className="orderby-characters">
                <label className="result-limit-label">Ordenar por:</label>
                <select name="sub_type" className="form-control"  onChange={this.handleSelectOrderByChange} value={sortName} disabled={this.state.loading}>
                    { orderBy.map((order)=> <option key={order.value} value={order.value}>{order.label}</option>) }
                </select>
            </span>
        );
    }

    createListComics(){

        const { data } = this.state;
        return( data.map((comic) =>
                <div  key={comic.id} className="ui card fadeIn-animation container-character" onClick={this.moreInfo.bind(this, comic)}>

                    <div className="image">
                        <img src={this.getImage(comic)} className="rounded img-thumbnail img-character" alt="Responsive image"/>
                    </div>

                    <div className="content">
                        <div className="header character-name" data-toggle="tooltip" data-placement="top" title={comic.title}>
                            {comic.title}
                        </div>
                    </div>

                </div>
            )
        );
    }


    render(){
        const {filters, page, maxPage} = this.state;

        return (
            <Main>
                <div className="row">

                    <div className="col-12">
                        <div className="card p-4 mt-5">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control w-25 m-1" placeholder="Pesquisar personagens" onChange={this.handleNameChange} value={filters.title}/>
                                <button type="button" className="btn btn-white btn-rounded" onClick={this.search} disabled={this.state.loading}>
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                            <div>
                                {this.createSelectLimit()}
                                {this.createOrderBy()}
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        {this.state.loading && <Loading />}

                        {!this.state.loading &&

                            <div className="card p-0 mt-3">
                                <div className="p-3 mt-3">
                                    { this.createListComics()}
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-12">
                        {!this.state.loading && <Paginator ref={paginator => this.paginator = paginator}
                                   page={page}
                                   maxPage={maxPage}
                                   onChangePage={this.handlePageChange}
                                   onNext={this.handleNextPages}
                                   onPrevious={this.handlePreviousPages} />}
                    </div>
                </div>
            </Main>
        )
    }
}
export default withRouter(Character);