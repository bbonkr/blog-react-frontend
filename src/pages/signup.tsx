import React, { FunctionComponent } from 'react';
import { Row, Col } from 'antd';
import {
    ContentWrapper,
} from '../styledComponents/Wrapper';
import SignUpForm from '../components/SignUpForm';
import DefaultLayout from '../components/DefaultLayout';

const SignUp: FunctionComponent = () => {
    return (
        <DefaultLayout>
            <ContentWrapper>
                <Row type='flex' justify='center' align='middle'>
                    <Col xs={24} sm={24} md={12}>
                        <div>sign up</div>
                        <SignUpForm />
                    </Col>
                </Row>
            </ContentWrapper>
        </DefaultLayout>
    );
};

export default SignUp;
