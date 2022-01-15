import { Box, Button, Divider, Flex, SimpleGrid, useColorMode, VisuallyHidden } from "@chakra-ui/core";
import React from "react";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";


interface OAuthProps
{
    rl: String;
}

export const OAuth: React.FC<OAuthProps> = ({ rl }) =>
{
    return (
        <>
            <Flex align="center" color="gray.300" mt={4}>
                <Box flex="1">
                    <Divider borderColor="currentcolor" />
                </Box>
                Or {rl} with
                <Box flex="1">
                    <Divider borderColor="currentcolor" />
                </Box>
            </Flex>
            <SimpleGrid mt="6" columns={3} spacing="3">
                <Button color="currentColor" variant="outline">
                    <VisuallyHidden>{rl} with Facebook</VisuallyHidden>
                    <FaFacebook />
                </Button>
                <Button color="currentColor" variant="outline">
                    <VisuallyHidden>{rl} with Google</VisuallyHidden>
                    <FaGoogle />
                </Button>
                <Button color="currentColor" variant="outline">
                    <VisuallyHidden>{rl} with Github</VisuallyHidden>
                    <FaGithub />
                </Button>
            </SimpleGrid>
        </>
    );
};
