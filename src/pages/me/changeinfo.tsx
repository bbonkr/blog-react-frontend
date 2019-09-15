import React, { FunctionComponent } from 'react';
import { withAuth } from '../../utils/auth';
import MeLayout from '../../components/MeLayout';
import { ContentWrapper } from '../../styledComponents/Wrapper';
import ChangeInfoForm from '../../components/ChangeInfoForm';
import { PageHeader } from 'antd';

const ChangeInfo: FunctionComponent = () => {
    return (
        <MeLayout>
            <ContentWrapper>
                <PageHeader title='Change account information' />
                <ChangeInfoForm />
            </ContentWrapper>
        </MeLayout>
    );
};

export default withAuth(ChangeInfo);
