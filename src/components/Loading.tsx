import React, { FunctionComponent } from 'react';
import { Spin } from 'antd';

const Loading: FunctionComponent = () => {
    return (
        <div style={{ position: 'fixed', top: '50%', left: '50%' }}>
            <Spin spinning={true} />
        </div>
    );
};

export default Loading;
