import React from "react";
import { Formik, Form } from "formik";
import
{
  Button,
  Heading,
  Stack,
} from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { CMode } from "../components/CMode";
import { SimplGrid } from "../components/SimplGrid";

interface registerProps { }

const Register: React.FC<registerProps> = ({ }) =>
{
  const [, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) =>
        {
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          }
          else if (response.data?.register.user) {
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
    </Wrapper>
  );
};

export default Register;