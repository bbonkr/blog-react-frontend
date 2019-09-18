import React, { FunctionComponent, useEffect } from 'react';
import { BackTop } from 'antd';
// import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, IUserState } from '../typings/reduxStates';
import { actionTypes } from '../reducers/actionTypes';
import { LOCAL_STORAGE_KEY_JWT } from '../typings/constant';

export interface IAppLayoutProps {
    children: React.ReactNode;
}

/**
 * 기초 레이아웃을 컴포넌트입니다.
 *
 * @param {element} 내부에 렌더링될 자식 요소
 */
const AppLayout: FunctionComponent<IAppLayoutProps> = ({ children }) => {
    const dispatch = useDispatch();
    const { me, token } = useSelector<IRootState, IUserState>((s) => s.user);

    useEffect(() => {
        if (!token) {
            const jwt = window.localStorage.getItem(LOCAL_STORAGE_KEY_JWT);
            if (jwt) {
                // _token = jwt;
                dispatch({
                    type: actionTypes.SET_JWT,
                    data: {
                        token: jwt,
                    },
                });
            }
        }

        if (!me) {
            dispatch({
                type: actionTypes.ME_CALL,
            });
        }
    }, []);

    return (
        <div style={{ minHeight: '100vh' }}>
            <BackTop />
            <div>{children}</div>
        </div>
    );
};

export default AppLayout;
