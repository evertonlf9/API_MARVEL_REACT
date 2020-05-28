import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Result, Button } from 'antd';

import { CharactersActions } from '../../core/store';
import MenuComponent from '../../core/components/menu/menu';

import './notfound.scss';

const { Header, Content, Footer } = Layout;

const NotFound = (props) => {
    const {history} = props;
    const {push} = history;

    const handlerClick = () => {
        push('/')
    }
  
    const render = () => {        
        return (
            <div id="not-found-component">   

                <Layout className="layout">
                    <Header>
                        <MenuComponent {...props}/>
                    </Header>
                    
                        <Content style={{ padding: '15px 50px' }}>        
                            <div className="site-layout-content">
                                <Result
                                    status="404"
                                    title="404"
                                    subTitle="Sorry, the page you visited does not exist."
                                    extra={<Button type="primary" onClick={handlerClick}>Back Home</Button>}
                                />
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(NotFound);