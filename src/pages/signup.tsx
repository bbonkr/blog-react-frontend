import React, { FunctionComponent } from 'react';
import { Row, Col, PageHeader, Divider } from 'antd';
import { ContentWrapper } from '../styledComponents/Wrapper';
import SignUpForm from '../components/SignUpForm';
import DefaultLayout from '../components/DefaultLayout';
import Head from 'next/head';
import { appOptions } from '../config/appOptions';

const SignUp: FunctionComponent = () => {
    return (
        <>
            <Head>
                <title>{`Sign up | ${appOptions.title}`}</title>
            </Head>

            <DefaultLayout>
                <ContentWrapper>
                    <PageHeader title='Welcome to Blog Service' />
                    <Divider />
                    <Row type='flex' justify='center' align='middle'>
                        <Col xs={24} sm={24} md={12}>
                            <div>sign up</div>
                            <SignUpForm />
                        </Col>
                    </Row>
                </ContentWrapper>
            </DefaultLayout>
        </>
    );
};

export default SignUp;
