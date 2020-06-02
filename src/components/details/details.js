import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Spin, Card, Tooltip, Descriptions } from 'antd';
// import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';

import EmptyComponent from '../../core/components/empty/empty';

import { CharactersActions } from '../../core/store';

import MenuComponent from '../../core/components/menu/menu';

import './details.scss';

const { Header, Content, Footer } = Layout;

const Deails = (props) => {
    const {getDataApi, data, loading, match, history} = props;
    const {params} = match;
    const {push} = history;
    const {results} = data;

    useEffect(() => {  
        getCharacter({type: params.type, id: params.id}); 
    }, []); 

    const getCharacter = (params) => {
        getDataApi(params);
    }

    const handlerClick = (item) => {
        let params = item.resourceURI.split('/public');
        // push(`${window.location.origin}/details${params[1]}`);
        window.location.href = `/details${params[1]}`;
    }

    const renderTooltip = (title) => {
        return (
            <Tooltip title={title}>
                <span>{title}</span>
            </Tooltip>
        )
    }

    const renderLink = (list) => {
        return (
           <>
            {
                list.map((item, id) => {
                    return (
                        <div key={id}>
                            <a onClick={handlerClick.bind(this, item)} title={item.name} tabIndex="0">{item.name}</a>
                            <br/>
                        </div>
                    )
                })
            }
           </>
        )
    }

    const renderDescription = (item) => {
        const {series, stories, events, comics, characters, creators, textObjects} = item;
        return(
            <div className="container-description">
                <Descriptions 
                    title="Mais informações"
                    layout="vertical"  
                    bordered 
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
                    {(item.description && !item.textObjects)&&
                        <Descriptions.Item label="Descrição" span={2}>
                            {<div dangerouslySetInnerHTML={{ __html: item.description }} />}
                        </Descriptions.Item>
                    }
                    
                    {item.textObjects &&
                        <Descriptions.Item label="Descrição" span={2}>
                            {
                                item.textObjects.map((obj, id) => {
                                    return (
                                        <div key={id} dangerouslySetInnerHTML={{ __html: obj.text }} />
                                    )
                                })
                            }
                            
                        </Descriptions.Item>
                    }
                </Descriptions>
                <Descriptions 
                    layout="vertical" 
                    bordered 
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>

                    {(characters && characters.items && characters.items.length > 0) &&
                        <Descriptions.Item label="Personagens">
                            { renderLink(characters.items) }
                        </Descriptions.Item>
                    }

                    {(creators && creators.items && creators.items.length > 0) &&
                        <Descriptions.Item label="Criadores">
                            { renderLink(creators.items) }
                        </Descriptions.Item>
                    }

                    {(comics && comics.items && comics.items.length > 0) &&
                        <Descriptions.Item label="Histórias em quadrinhos">
                            { renderLink(comics.items) }
                        </Descriptions.Item>
                    }

                    {(series && series.items && series.items.length > 0) &&
                        <Descriptions.Item label="Series">
                            { renderLink(series.items) }
                        </Descriptions.Item>
                    }
                    
                    {(stories && stories.items && stories.items.length > 0) &&
                        <Descriptions.Item label="Histórias">
                           { renderLink(stories.items) }
                        </Descriptions.Item>
                    }

                    {(events && events.items && events.items.length > 0) &&
                        <Descriptions.Item label="Eventos">
                            { renderLink(events.items) }
                        </Descriptions.Item>
                    }
                </Descriptions>
            </div>
        );
    }

    const renderCard = () => {
        const item = results[0];
        return (
            <Card
                hoverable
                loading={loading}
                // style={{ width: 1300 }}
                title={renderTooltip((item.type === "story" && item.originalIssue && item.originalIssue.name) || item.name || item.title || item.fullName)}
                cover={item.thumbnail && <img alt={item.description} title={item.name || item.title || item.fullName} src={`${item.thumbnail.path}.${item.thumbnail.extension}`} />}
            >
                
            </Card>
        );
    }
  
    const render = () => {
        return (
            <div id="deails-component">   

                <Layout className="layout">
                    <Header>
                        <MenuComponent {...props}/>
                    </Header>
                    <div className="container-layout-content">
                        <Content style={{ padding: '15px 50px' }}>  
                    
                            <div className="container">
                                {loading &&                                     
                                    <div className="site-layout-content">
                                        <div className="container-spin">
                                            <Spin tip="Loading..." size="large"/>
                                        </div>       
                                    </div>
                                } 

                                {(!loading && results && results.length > 0) &&
                                    <>
                                        {renderCard()}
                                        {renderDescription(results[0])}
                                    </>
                                }

                                

                                {(!loading && !results) &&     
                                    <EmptyComponent/>
                                }
                            </div> 
                        </Content>
                    </div>
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