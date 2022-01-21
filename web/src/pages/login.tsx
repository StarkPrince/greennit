import React from "react";
import { Formik, Form } from "formik";
import { Button, Heading, Link, Stack } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { CMode } from "../components/CMode";
import { OAuth } from "../components/OAuth";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

interface loginProps { }

const Login: React.FC<loginProps> = ({ }) =>
{
    const [, login] = useLoginMutation();
    const router = useRouter();
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ usernameOrEmail: "", password: "" }}
                onSubmit={async (values, { setErrors }) =>
                {
                    const response = await login(values);
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors));
                    }
                    else if (response.data?.login.user) {
                        if (typeof router.query.redirect == 'string') {
                            router.push(router.query.redirect as string);
                        }
                        else {
                            router.push("/");
                        }
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Heading mb={6}>Login
                            <CMode />
                        </Heading>
                        <Stack spacing="6">
                            <InputField
                                name="usernameOrEmail"
                                placeholder="username or email"
                                label="Username or Email"
                            />
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                            <NextLink href="/forgot-password">
                                <Link color='teal.500' mb={4}>
                                    forgot password?
                                </Link>
                            </NextLink>
                            <Button type="submit" size="lg" fontSize="md" isLoading={isSubmitting}
                                variantColor="blue">
                                Login
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
            <OAuth rl={"login"} />
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(Login);