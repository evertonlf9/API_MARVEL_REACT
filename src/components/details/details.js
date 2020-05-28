import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Spin } from 'antd';

import { CharactersActions } from '../../core/store';

import MenuComponent from '../../core/components/menu/menu';

import './details.scss';

const { Header, Content, Footer } = Layout;

const Deails = (props) => {
    const [paginate, setPaginate] = useState('');
    const {getDataApi, data, loading, match} = props;
    const {params} = match;

    useEffect(() => {  
        getCharacter({type: params.type, id: params.id});
    }, []); 

    const getCharacter = (params) => {
        setPaginate(params);
        getDataApi(params);
    }
  
    const render = () => {
        
        return (
            <div id="deails-component">   

                <Layout className="layout">
                    <Header>
                        <MenuComponent {...props}/>
                    </Header>

                    <Content style={{ padding: '15px 50px' }}>  
                
                        <div className="container">
                            {loading &&                                     
                                <div className="site-layout-content">
                                    <div className="container-spin">
                                        <Spin tip="Loading..." size="large"/>
                                    </div>       
                                </div>
                            } 

                            

                            {/* {(!loading && data && data.length === 0) &&     
                            <EmptyComponent/>
                            } */}
                        </div> 
                    </Content>

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

export default connect(mapStateToProps, mapDispatchToProps)(Deails);