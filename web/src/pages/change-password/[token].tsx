import { Heading, Stack, Button, Link } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { CMode } from '../../components/CMode';
import { InputField } from '../../components/InputField';
import { Navbar } from '../../components/Navbar';
import { useChangePasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import NextLink from 'next/link';
import { Wrapper } from '../../components/Wrapper';

export const ChangePassword: NextPage<{ token: string }> = ({ token }) =>
{
    const router = useRouter();
    const [, changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState<string | null>(null);
    return (<div>
        <Wrapper variant="small">
            <Formik
                initialValues={{ newPassword: "" }}
                onSubmit={async (values, { setErrors }) =>
                {
                    const response = await changePassword({ token, newPassword: values.newPassword });
                    if (response.data?.changePassword.errors) {
                        const errorMap = toErrorMap(response.data.changePassword.errors);
                        if ("token" in errorMap) {
                            setTokenError(errorMap.token);
                        }
                        setErrors(errorMap);
                    }
                    else if (response.data?.changePassword.user) {
                        await router.push("/");
                    }
                }
                }
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Heading mb={6}>Change Password
                            <CMode />
                        </Heading>
                        <Stack spacing="6">
                            <InputField
                                name="newPassword"
                                placeholder="new password"
                                label="New Password"
                                type="password"
                            />
                            {tokenError &&
                                <NextLink href="/forgot-password">
                                    <Link color='teal.500' mb={4}>
                                        {tokenError} :( click here to get a new one :)
                                    </Link>
                                </NextLink>}
                            <Button type="submit" size="lg" fontSize="md" isLoading={isSubmitting}
                                variantColor="blue">
                                Change password
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    </div>)
}

ChangePassword.getInitialProps = async ({ query }) =>
{
    return {
        token: query.token as string
    }
}

export default withUrqlClient(createUrqlClient)(ChangePassword);