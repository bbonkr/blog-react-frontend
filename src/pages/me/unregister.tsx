import React, {
    useState,
    useCallback,
    useEffect,
    FunctionComponent
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { withAuth } from "../../utils/auth";
import MeLayout from "../../components/MeLayout";
import { ContentWrapper } from "../../styledComponents/Wrapper";
import { PageHeader, Form, Input, Button, Modal, Divider } from "antd";
import { SignUpFormValidator } from "../../helpers/SignUpFormValidator";
import Router from "next/router";
import { actionTypes } from "../../reducers/actionTypes";
import { RootState, UserState } from "../../typings/reduxStates";
import { NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import { BaseAction } from "../../typings/BaseAction";
import { PageProps } from "../../typings/PageProps";

const Validator = new SignUpFormValidator();

const Unregister: FunctionComponent = () => {
    const dispatch = useDispatch();
    const {
        unregisterLoading,
        unregisterErrorReason,
        unregisterSuccess
    } = useSelector<RootState, UserState>(s => s.user);
    const [password, setPassword] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    useEffect(() => {
        if (unregisterSuccess) {
            Router.push("/signout");
        }
    }, [unregisterSuccess]);

    const onChangePassword = useCallback(e => {
        const newValue = e.target.value;
        setPassword(newValue);
        const { message } = Validator.checkPassword({ password: newValue });
        setPasswordErrorMessage(message);
    }, []);

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            const formData = { password: password };
            const { valid, message } = Validator.checkPassword(formData);
            setPasswordErrorMessage(message);
            if (valid) {
                Modal.confirm({
                    title: "Do you want to unregister our service?",
                    content: "",
                    onOk: () => {
                        dispatch({
                            type: actionTypes.UNREGISTER_CALL,
                            data: {
                                password: password.trim()
                            }
                        });
                    },
                    onCancel: null
                });
            }
        },
        [dispatch, password]
    );

    return (
        <MeLayout>
            <ContentWrapper>
                <PageHeader title="Unregister" />
                <Divider />
                <div>
                    <p>Will delete your data when proceed to unregister.</p>
                    <ul>
                        <li>Account</li>
                        <li>Posts</li>
                        <li>Categories</li>
                        <li>Files</li>
                    </ul>
                </div>

                <div>
                    <Form onSubmit={onSubmit}>
                        <Form.Item
                            label="Password"
                            hasFeedback={true}
                            help={passwordErrorMessage || unregisterErrorReason}
                            validateStatus={
                                !passwordErrorMessage && !unregisterErrorReason
                                    ? "success"
                                    : "error"
                            }
                        >
                            <Input.Password
                                value={password}
                                onChange={onChangePassword}
                                placeholder="Input your password."
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="danger"
                                htmlType="submit"
                                loading={unregisterLoading}
                            >
                                Unregister
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </ContentWrapper>
        </MeLayout>
    );
};

Unregister.getInitialProps = async (
    context: NextPageContext & NextJSContext<RootState, BaseAction>
): Promise<PageProps> => {
    return {};
};

export default withAuth(Unregister);
