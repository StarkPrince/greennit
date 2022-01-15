import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Heading, SimpleGrid, VisuallyHidden } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { CMode } from "../components/CMode";
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import { SimplGrid } from "../components/SimplGrid";

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
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button type="submit" variantColor="blue" size="lg" fontSize="md" ml={"auto"} isLoading={isSubmitting} >
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default Login;