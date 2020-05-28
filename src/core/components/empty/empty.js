import React from 'react';
import { Empty, Button } from 'antd';

const EmptyComponent = (props) => {
  
    const render = () => {
        
        return (
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                height: 60,
                }}
                description={
                <span>
                    <a href="">Nenhum resultado encontrado</a>
                </span>
                }
            >
          </Empty>
        )
    }

    return(<>{render()}</>);  
}

export default EmptyComponent;