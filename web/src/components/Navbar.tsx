import React from "react";
import { Box, Button, Flex, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { CMode } from "./CMode";
import { isServer } from "../utils/isServer";
interface NavbarProps { }

export const Navbar: React.FC<NavbarProps> = ({ }) =>
{
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery({
        pause: isServer(),
    });
    let body = null;
    if (fetching) {

    }
    else if (!data?.me) {
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
                    <Link ml={6}>{data.me.username}</Link>
                </NextLink>
                <Button ml={6} mr={3} isLoading={logoutFetching} onClick={() =>
                {
                    logout();
                }}>
                    Logout
                </Button>

            </>
        )
    }
    return (
        // create a beautiful navbar
        <Flex p={4} background="gray.800">
            <Box>
                <NextLink href="/">
                    <Link ml={3} color="brown">Home</Link>
                </NextLink>
                <NextLink href="/about">
                    <Link ml={8} color="brown">About</Link>
                </NextLink>
                <NextLink href="/blog">
                    <Link ml={8} color="brown">Blog</Link>
                </NextLink>
            </Box>
            <Box ml={"auto"}>
                {body}
            </Box>
        </Flex>
    );
};