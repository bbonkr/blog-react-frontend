import React, { useCallback, useState, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Upload,
    Typography,
    PageHeader,
} from 'antd';
import { ContentWrapper } from '../../styledComponents/Wrapper';
import MeLayout from '../../components/MeLayout';
import styled from 'styled-components';
import FileList from '../../components/FileList';
import { withAuth } from '../../utils/auth';
import { actionTypes } from '../../reducers/actionTypes';

const DropZoneDiv = styled.div`
    border: '2px dashed gray';
    height: '15rem';
    width: '100%';
    padding: '2rem';
    text-align: 'center';
    vertical-align: 'middle';
`;

const Media: FunctionComponent = () => {
    return (
        <MeLayout>
            <ContentWrapper>
                <PageHeader title='Media' />
                <FileList />
            </ContentWrapper>
        </MeLayout>
    );
};

Media.getInitialProps = async (context) => {
    const state = context.store.getState();
    const { mediaFilesLimit } = state.me;
    context.store.dispatch({
        type: actionTypes.LOAD_MY_MEDIA_FILES_CALL,
        data: {
            pageToken: null,
            limit: mediaFilesLimit,
            keyword: '',
        },
    });

    return {};
};

export default withAuth(Media);
