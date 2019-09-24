import React, {
    FunctionComponent,
    useEffect,
    useState,
    useCallback,
} from 'react';
import { BackTop, Affix, Progress } from 'antd';
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
 * @param {element} 내부에 렌더링될 요소
 */
const AppLayout: FunctionComponent<IAppLayoutProps> = ({ children }) => {
    const dispatch = useDispatch();
    const { me, token } = useSelector<IRootState, IUserState>((s) => s.user);
    const [verticalScrollPercent, setVerticalScrollPercent] = useState(0);
    const [visibleScrollPercent, setVisibleScrollPercent] = useState(false);

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

        const onScroll = (e: Event): any => {
            console.debug('[APP] scroll: ');
        };

        window.addEventListener('scroll', onScroll, false);
        setVerticalScrollPercent(0);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const onContentDivScroll = useCallback(
        (event: React.UIEvent<HTMLDivElement>): void => {
            setVisibleScrollPercent(true);
            const element: HTMLDivElement = event.target as HTMLDivElement;
            // console.debug(
            //     `[APP] scrollHeight: ${
            //         element.scrollTop
            //     } / ${element.scrollHeight -
            //         element.scrollTop} / ${(element.scrollTop /
            //         (element.scrollHeight - element.clientHeight)) *
            //         100}`,
            // );

            setVerticalScrollPercent(
                (element.scrollTop /
                    (element.scrollHeight - element.clientHeight)) *
                    100,
            );
        },
        [verticalScrollPercent],
    );

    useEffect(() => {
        if (!me && token) {
            dispatch({
                type: actionTypes.ME_CALL,
            });
        }
    }, [me, token]);

    // console.info('[APP] AppLayout render');
    // console.debug('[APP] verticalScrollPercent: ', verticalScrollPercent);
    return (
        <div
            style={{
                minHeight: '100vh',
            }}
            onScroll={onContentDivScroll}>
            <div
                style={{
                    padding: 0,
                    margin: 0,
                    top: 0,
                    width: '100%',
                    height: '2px',
                    position: 'fixed',
                    zIndex: 100,
                    backgroundColor: '#6d6d6d',
                    visibility: visibleScrollPercent ? 'visible' : 'hidden',
                    display: visibleScrollPercent ? 'block' : 'none',
                }}>
                <div
                    style={{
                        backgroundColor: '#ef6233',
                        width: `${verticalScrollPercent}%`,
                        height: '2px',
                    }}></div>
            </div>
            <div>{children}</div>
        </div>
    );
};

export default AppLayout;
