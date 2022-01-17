import { Heading, Stack, Button, Text, AlertIcon, Alert } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { CMode } from "../components/CMode";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPassword = () =>
{
    const [sent, setSent] = useState(false);
    const [, forgotPassword] = useForgotPasswordMutation();
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ email: "" }}
                onSubmit={async (values, { setErrors }) =>
                {
                    forgotPassword({ email: values.email });
                    setSent(true);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Heading mb={6}>Send the reset link
                            <CMode />
                        </Heading>
                        <Stack spacing="6">
                            <InputField
                                name="email"
                                placeholder="email"
                                label="Email"
                                type="email"
                            />
                            <Button type="submit" size="lg" fontSize="md" isLoading={isSubmitting}
                                variantColor="blue">
                                Send
                            </Button>
                            {sent && (
                                <>
                                    <Alert status='success'>
                                        <AlertIcon />
                                        Reset Link sent :&#41;
                                    </Alert>
                                </>
                            )}
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Wrapper>)
}

export default withUrqlClient(createUrqlClient, { ssr: true })(ForgotPassword);
