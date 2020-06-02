import React, { useEffect, useState } from 'react';
import { Input, Pagination, Layout, Card, Tooltip, Spin  } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';

import EmptyComponent from '../empty/empty';

import './list.scss';

const { Content } = Layout;
const { Meta } = Card;

const ListComponent = (props) => {
    const [searchText, setSearchText] = useState('');
    const {loading, getData, data, total, history, paginate} = props;
    const {push} = history;

    useEffect(() => {  
        setSearchText(paginate.name);
    }, []); 

    const handlerClickSearch = () => {
        getData({ ...paginate, name: searchText });
    }
    
    const handlerKeyPressSearch = (e) => {
        if(e['keyCode'] === 13 && !loading) {
            handlerClickSearch();
        }
    }
    
    const handlerKeyPress = (e) => {
        if(e['keyCode'] === 13 && !loading) {
            getData({ ...paginate, name: searchText });
        }
    }
  
    const handlerClickClearSearch = () => {
        getData({
            ...paginate,
            limit: 10,
            offset: 0,
            name: ''
        });
    }
    
    const handlerKeyPressClearSearch = (e) => {
        if(e['keyCode'] === 13 && !loading) {
            handlerClickClearSearch();
        }
    }

    const handleChange = (e) => {
        setSearchText(e.currentTarget.value);
    }

    const handleChangePagination = (offset, limit) => {
        offset = offset - 1;
        getData({ ...paginate, limit, offset, name: searchText });       
    }
    
    const handleChangeSize = (offset, limit) => {
        offset = 0;
        getData({ ...paginate, limit, offset, name: searchText });        
    }

    const renderSearch = () => {
        return(
            <div className="container-header">
                <Input id="search" disabled={loading} className="input-search" placeholder="Pesquisar..." value={searchText} maxLength="255" onChange={handleChange} onKeyPress={handlerKeyPress} />
                <div className="btn-search" onClick={handlerClickSearch} onKeyPress={handlerKeyPressSearch} tabIndex="0" aria-label="Pesquisar" role="button">
                    <SearchOutlined />
                </div>
                <div className="btn-search" onClick={handlerClickClearSearch} onKeyPress={handlerKeyPressClearSearch} tabIndex="0" aria-label="Limpar a pesquisa" role="button">
                    <DeleteOutlined />
                </div>
            </div>
        )
    }
    const renderPagination = () => {
        return(
            <Pagination
                total={total}
                showTotal={(total, range) => {
                    return `${range[0]}-${range[1]} of ${total} items`
                }}
                pageSize={paginate.limit || 10}
                current={ (paginate.offset + 1)  || 1}
                defaultCurrent={1}
                responsive={true}
                showSizeChanger={true}
                onChange={handleChangePagination.bind(this)}
                onShowSizeChange={handleChangeSize.bind(this)}
            />
        )
    }

    const handlerKeyPressMore = (item, e) => {
        if(e['keyCode'] === 13 && !this.loading) {
            handlerClickMore(item);
        }
    }
    
    const handlerClickMore = (item) => {
        push(`/details/${paginate.type}/${item.id}`);
    }

    const renderTooltip = (title) => {
        return (
            <Tooltip title={title}>
                <span>{title}</span>
            </Tooltip>
        )
    }

    const renderCards = () => {
        return(
            <>
            {
                data.map((item, key) => {
                    return (
                        <Card
                            key={key}
                            hoverable
                            loading={loading}
                            style={{ width: 270 }}
                            extra={<a tabIndex="0" href="" onClick={handlerClickMore.bind(this, item)} onKeyPress={handlerKeyPressMore.bind(this, item)}>Mais</a>}
                            title={renderTooltip((item.type === "story" && item.originalIssue && item.originalIssue.name) || item.name || item.title || item.fullName)}
                            cover={item.thumbnail && <img alt={item.description} title={item.name || item.title || item.fullName} src={`${item.thumbnail.path}.${item.thumbnail.extension}`} />}
                        >
                            <Meta title={''} description={item.description || (item.type === "story" && item.title) || 'Not description.'} />
                            {/* <Meta title={item.name || item.title || item.fullName} description={item.description} /> */}
                        </Card>
                    )
                })
            }
            </>
        );
    }
  
    const render = () => {
        
        return (
            <div className="container-layout-content">
                <Content style={{ padding: '15px 50px' }}>   
                    <div className="container">
                        {renderSearch()}
                    </div>                    
                </Content>
                <Content style={{ padding: '5px 50px' }}>  
                
                    <div className="container">
                        {loading &&                                     
                            <div className="site-layout-content">
                                <div className="container-spin">
                                    <Spin tip="Loading..." size="large"/>
                                </div>       
                            </div>
                        } 

                        { (!loading && data && data.length > 0) &&  renderCards() }

                        {(!loading && data && data.length > 0) &&  renderPagination() }

                        {(!loading && data && data.length === 0) &&     
                           <EmptyComponent/>
                        }
                    </div> 
                </Content>
            </div>
        )
    }

    return(<>{render()}</>);  
}

export default ListComponent;