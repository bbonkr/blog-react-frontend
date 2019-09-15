import React, { useState, useCallback, useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Input,
    Divider,
    Select,
    Form,
    Button,
    Tabs,
    Icon,
    PageHeader,
} from 'antd';
import Markdown from 'react-markdown';
import { ContentWrapper } from '../../styledComponents/Wrapper';
import MeLayout from '../../components/MeLayout';
import { withAuth } from '../../utils/auth';
// import { markdownConverter } from '../../helpers/converter';
import showdown from 'showdown';
import xssFilter from 'showdown-xss-filter';
import WritePostForm from '../../components/WritePostForm';
import { actionTypes } from 'reducers/actionTypes';

const PLACEHOLDER_MARKDOWN = 'Write your thought!';

export interface IWriteProps {
    id?: number;
}

const Write: FunctionComponent<IWriteProps> = ({ id }) => {
    return (
        <MeLayout>
            <ContentWrapper>
                <PageHeader title="Write" />
                <Divider />
                <WritePostForm key={`post-${id}`} id={id} />
            </ContentWrapper>
        </MeLayout>
    );
};

Write.getInitialProps = async (context) => {
    const { id } = context.query;

    // console.log('/me/write ==> id: ', id);

    if (id) {
        context.store.dispatch({
            type: actionTypes.LOAD_MY_POST_CALL,
            data: id,
        });
    } else {
        context.store.dispatch({
            type: actionTypes.WRITE_NEW_POST_CALL,
        });
    }

    context.store.dispatch({
        type: actionTypes.LOAD_MY_CATEGORIES_CALL,
        data: {
            pageToken: null,
            limit: 0,
            keyword: '',
        },
    });

    context.store.dispatch({
        type: actionTypes.LOAD_MY_TAGS_CALL,
    });

    return { id };
};

export default withAuth(Write);
