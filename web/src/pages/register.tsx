import
{
  Button, Heading, Stack
} from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { CMode } from "../components/CMode";
import { InputField } from "../components/InputField";
import { OAuth } from "../components/OAuth";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps { }

const Register: React.FC<registerProps> = ({ }) =>
{
  const [, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) =>
        {
          const response = await register({ options: values });
          console.log(response);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <>
            <Form>
              <Heading mb={6}>Register
                <CMode />
              </Heading>
              <Stack spacing="6">
                <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
                />
                <InputField
                  name="email"
                  placeholder="email"
                  label="Email"
                  type="email"
                />
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
                <Button type="submit" size="lg" fontSize="md" isLoading={isSubmitting}
                  variantColor="blue">
                  Register
                </Button>
              </Stack>
            </Form>
          </>
        )}
      </Formik>
      <OAuth rl={"register"} />
    </Wrapper>
  );
};

export default Register;