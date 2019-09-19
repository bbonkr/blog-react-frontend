import React, { FunctionComponent, useEffect } from 'react';
import { BackTop } from 'antd';
// import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, IUserState } from '../typings/reduxStates';
import { actionTypes } from '../reducers/actionTypes';
import {
    LOCAL_STORAGE_KEY_JWT,
    LOCAL_STORAGE_KEY_SAVED_AT,
} from '../typings/constant';

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
            let jwt: string;
            const jwtLocalStorage = window.localStorage.getItem(
                LOCAL_STORAGE_KEY_JWT,
            );
            const jwtLocalStorageSavedAt = window.localStorage.getItem(
                LOCAL_STORAGE_KEY_SAVED_AT,
            );

            const jwtSessionStorage = window.sessionStorage.getItem(
                LOCAL_STORAGE_KEY_JWT,
            );
            const jwtSessionStorageSavedAt = window.sessionStorage.getItem(
                LOCAL_STORAGE_KEY_SAVED_AT,
            );

            if (jwtLocalStorage && jwtSessionStorage) {
                const l = parseInt(jwtLocalStorageSavedAt, 10);
                const s = parseInt(jwtSessionStorageSavedAt, 10);

                if (l > s) {
                    jwt = jwtLocalStorage;
                } else {
                    jwt = jwtSessionStorage;
                }
            } else if (jwtLocalStorage) {
                jwt = jwtLocalStorage;
            } else if (jwtSessionStorage) {
                jwt = jwtSessionStorage;
            } else {
                jwt = null;
            }

            if (jwt) {
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

    // console.info('[APP] AppLayout render');

    return (
        <div style={{ minHeight: '100vh' }}>
            <BackTop />
            <div>{children}</div>
        </div>
    );
};

export default AppLayout;
