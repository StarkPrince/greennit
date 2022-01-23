import React from "react";
import { Box, Button, Flex, Link, useColorMode } from "@chakra-ui/core";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { CMode } from "./CMode";
import { isServer } from "../utils/isServer";
interface NavbarProps { }

export const Navbar: React.FC<NavbarProps> = ({ }) =>
{
    const { colorMode, toggleColorMode } = useColorMode();
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery({
        pause: isServer(),
    });
    let body = null;
    if (!fetching && !data?.me) {
        body = (
            <>
                <CMode />
                <NextLink href="/register">
                    <Button ml={6}>
                        Register
                    </Button>
                </NextLink>
                <NextLink href="/login">
                    <Button ml={6} mr={3}>
                        Login
                    </Button >
                </NextLink>
            </>
        )
    }
    else {
        body = (
            <>
                <CMode />
                <NextLink href="/profile">
                    <Link ml={6}>{data?.me.username}</Link>
                </NextLink>
                <Button ml={6} mr={3} isLoading={logoutFetching} onClick={() => { logout(); }}>
                    Logout
                </Button>

            </>
        )
    }
    return (
        // create a beautiful navbar
        <Flex p={2} backgroundColor={colorMode === "light" ? "white" : "black"} top={0}>
            <Flex>
                <Box mr={8} my="auto">
                    <NextLink href="/">
                        Home
                    </NextLink>
                </Box>
                <Box mr={8} my="auto">
                    <NextLink href="/about">
                        About
                    </NextLink>
                </Box>
                <Box mr={8} my="auto">
                    <NextLink href="/blog">
                        Blog
                    </NextLink>
                </Box>
            </Flex>
            <Box ml={"auto"}>
                {body}
            </Box>
        </Flex>
    );
};