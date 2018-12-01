import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Main from '../../commom/main';
import { getMarvel } from '../../commom/libs/apiCalls';
import Paginator from '../../commom/paginator';
import Loading from '../../commom/loading';
import Select from '../../commom/select';
import Search from '../../commom/search';

class Character extends Component {
    constructor(props){
        super(props);

        this.state = {
            filters: {
                name: ""
            },
            sortName: '',
            characters: [],
            page: 0,
            maxPage: 0,
            limitPerPage: 20,
            exactMatch: false,
            loading: false,
            data: []
        }
    }

    // É executado quando o componente estiver prestes a ser montado no DOM da página.
    componentWillMount() {
        this.search();
    }

    // O método que é executado depois que o componente foi montado no DOM.
    componentDidMount() {

    }

    // O componente recebe novas props ou estado, o React re-renderiza ou pode ignorar a renderização do componente.
    // shouldComponentUpdate (nextProps, nextState){
    //     let shouldUpdate = this.props.status !== nextProps.status;
    //     return shouldUpdate;
    // }

    // É executado quando as props mudaram e não são processados ​​pela primeira vez.
    componentWillReceiveProps(nextProps) {

    }

    // O componente não é mais necessário e será desmontado do DOM.
    componentWillUnmount() {

    }

    search = (options = {}) => {

        this.setState({ loading: true });
        const {limitPerPage, filters, exactMatch} = this.state;

        options.type = 'stories';

        const {page, name, limit, type, sortName,
        } = Object.assign({
            page: 1,
            type: "stories",
            name: filters.name,
            sortName: this.state.sortName,
            limit: options.limitPerPage || limitPerPage,
            exactMatch: exactMatch
        }, options);

        const offset = page ? (page - 1) * limit : 0;

        getMarvel({ offset, name, sortName, limit, type, exactMatch })
            .then(({ data, maxPage }) => {

                this.setState({
                    data,
                    maxPage,
                    page: data.length ? page : 0,
                    loading: false
                });

            })
            .catch((error) => {
                this.setState({loading: false});
            });
    };

    moreInfo = (character, e) => {
        // this.props.history.push('/characters/' + character.id);
    };

    handleNameChange = (event) => {
        this.setState({filters: {...this.state.filters, name: event.target.value} });
    };

    handleSelectChange = (event) => {
        this.setState({...this.state, limitPerPage: event.target.value});
        this.search({limitPerPage: event.target.value });
    };

    handleSelectOrderByChange = (event) => {
        this.setState({...this.state, sortName: event.target.value});
        this.search({sortName: event.target.value});
    };

    handleNextPages = (maxPage) => {
        this.handlePageChange(maxPage + 1);
    };

    handlePreviousPages = (minPage) => {
        if (minPage > 1) {
            this.handlePageChange(minPage - 1)
        }
    };

    handlePageChange = (page) => {
        this.setState({...this.state, page});
        this.search({page});
    };

    createListCharacters = () => {

        const { data } = this.state;
        return( data.map((character) =>
                <div  key={character.id} className="ui card fadeIn-animation container-character" onClick={this.moreInfo.bind(this, character)}>

                    <div className="content">
                        <div className="header character-name" data-toggle="tooltip" data-placement="top" title={character.title}>
                            {character.title}
                        </div>
                    </div>

                </div>
            )
        );
    }


    render(){
        const {filters, page, maxPage, limitPerPage, sortName, data} = this.state;
        const {limits, orderBy} = this.props;

        return (
            <Main>
                <div className="row">

                    <div className="col-12">
                        <div className="card p-4 mt-5">
                            <div className="input-group mb-3">

                                <Search
                                    disabled={this.state.loading}
                                    value={filters.name}
                                    handleChange={this.handleNameChange}
                                    handleClick={this.search}
                                    placeholder={'Pesquisar personagens'}
                                    classContainer={'input-group mb-3'}
                                    classInput={'form-control w-25 m-1'}
                                    classButton={'btn btn-white btn-rounded'}
                                    classIcon={'fa fa-search'}
                                />

                            </div>
                            <div>

                                <Select
                                    key={'result-limit'}
                                    label={'Result Limit:'}
                                    options={limits}
                                    disabled={this.state.loading}
                                    value={limitPerPage}
                                    handleChange={this.handleSelectChange}
                                    classSpan={'result-limit-characters'}
                                    classLabel={'result-limit-label'}
                                    classSelect={'form-control select-width'}
                                />

                                <Select
                                    key={'orderBy'}
                                    label={'Ordenar por:'}
                                    options={orderBy}
                                    disabled={this.state.loading}
                                    value={sortName}
                                    handleChange={this.handleSelectOrderByChange}
                                    classSpan={'orderby-characters'}
                                    classLabel={'result-limit-label'}
                                    classSelect={'form-control select-width inline-block'}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        {this.state.loading && <Loading />}

                        {(!this.state.loading && data.length === 0) &&
                        <div  className="ui card fadeIn-animation container-character">
                            <div className="content">
                                <div className="header result-not-found">
                                    Nem um resultado foi encontrado!
                                </div>
                            </div>

                        </div>
                        }

                        {(!this.state.loading && data.length > 0) &&

                            <div className="card p-0 mt-3">
                                <div className="p-3 mt-3">
                                    { this.createListCharacters()}
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-12">
                        {(!this.state.loading && data.length > 0) &&
                            <Paginator ref={paginator => this.paginator = paginator}
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
const mapStateToProps = state => ({limits: state.character.limits, orderBy: state.character.orderBy});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Character));