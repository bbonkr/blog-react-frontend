import React, { FunctionComponent } from 'react';
import Error from 'next/error';
import PropTypes from 'prop-types';
import { ContentWrapper } from '../styledComponents/Wrapper';
import DefaultLayout from '../components/DefaultLayout';

export interface IBlogErrorProps {
    statusCode: number;
}

const BlogError: FunctionComponent<IBlogErrorProps> = ({ statusCode }) => {
    // console.log('statusCode', statusCode);

    return (
        <DefaultLayout>
            <ContentWrapper>
                <h1>{`HTTP ${statusCode}`}</h1>
                {/* <Error statusCode={statusCode} /> */}
            </ContentWrapper>
        </DefaultLayout>
    );
};

BlogError.defaultProps = {
    statusCode: 400,
};

// BlogError.propTypes = {
//     statusCode: PropTypes.number,
// };

BlogError.getInitialProps = async (context) => {
    const statusCode = context.res
        ? context.res.statusCode
        : context.err
        ? context.err.statusCode
        : null;
    return {
        statusCode,
    };
};

export default BlogError;
