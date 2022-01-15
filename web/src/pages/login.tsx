import React from "react";
import { Formik, Form } from "formik";
import { Button, Heading, Stack } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { CMode } from "../components/CMode";
import { OAuth } from "../components/OAuth";

interface loginProps { }

const Login: React.FC<loginProps> = ({ }) =>
{
    const [, login] = useLoginMutation();
    const router = useRouter();
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, { setErrors }) =>
                {
                    const response = await login({ options: values });
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors));
                    }
                    else if (response.data?.login.user) {
                        router.push("/");
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
                                name="username"
                                placeholder="username"
                                label="Username"
                            />
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
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

export default Login;