import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import { CharactersActions } from '../../core/store';

import MenuComponent from '../../core/components/menu/menu';
import ListComponent from '../../core/components/list/list';

import './comics.scss';

const { Header, Footer } = Layout;

const Comics = (props) => {
    const [paginate, setPaginate] = useState('');
    const {getDataApi, data} = props;

    useEffect(() => {    
        getCharacter({type: 'comics', offset: 0, limit: 10, name: ''});
    }, []); 

    const getCharacter = (params) => {
        setPaginate(params);
        getDataApi(params);
    }
  
    const render = () => {
        
        return (
            <div id="comics-component">   

                <Layout className="layout">
                    <Header>
                        <MenuComponent {...props}/>
                    </Header>

                    <ListComponent {...props} getData={getCharacter} paginate={paginate} type={paginate.type} data={data.results} total={data.total} />}

                    <Footer style={{ textAlign: 'center' }}>
                        &copy; 2020 by <a href="http://marvel.com/" target='_blank'>Marvel</a>
                    </Footer>
                </Layout>
            </div>
        )
    }

    return(<>{render()}</>)  
  
}

const mapStateToProps = state => {
  const {characters} = state;

	return {
        loading: characters.loading,
        data: characters.data,
	};
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...CharactersActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Comics);