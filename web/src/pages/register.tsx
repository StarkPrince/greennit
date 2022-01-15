import React from "react";
import { Formik, Form } from "formik";
import
{
  Box,
  Button,
  Heading,
  useColorMode,
} from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useColorModeValue } from "@chakra-ui/color-mode";

interface registerProps { }

const REGISTER_MUT = `
mutation Register($username: String!, $password:String!) {
  register(options: { username: $username, password: $password }) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
`;

const Register: React.FC<registerProps> = ({ }) =>
{
  const [, register] = useMutation(REGISTER_MUT);
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(colorMode);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) =>
        {
          const response = await register(values);
          console.log(response.data);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Heading mb={6}>Register
              <Button onClick={toggleColorMode} ml={4}>
                {colorMode === "light" ? (<SunIcon />) : (<MoonIcon />)}
              </Button>
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
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;