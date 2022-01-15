import React from "react";
import { Box, Flex, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";
import { CMode } from "./CMode";
interface NavbarProps { }

export const Navbar: React.FC<NavbarProps> = ({ }) =>
{
    const [{ data, fetching }] = useMeQuery();
    let body = null;
    if (fetching) {

    }
    else if (!data?.me) {
        body = (
            <>
                <Box mr={8}>
                    <CMode />
                </Box>
                <Box mr={8}>
                    <NextLink href="/register">
                        <Link ml={8} color="brown">Register</Link>
                    </NextLink>
                </Box>
                <Box mr={8}>
                    <NextLink href="/login">
                        <Link ml={8} color="brown">Login</Link>
                    </NextLink>
                </Box >
            </>
        )
    }
    else {
        body = (
            <Flex>
                <Box mr={8}>
                    <CMode />
                </Box>
                <Box mr={8}>
                    <NextLink href="/profile">
                        <Link>{data.me.username}</Link>
                    </NextLink>
                </Box>
                <Box mr={8}>
                    <Link onClick={() =>
                    {
                        localStorage.removeItem('token');
                    }}>Logout</Link>
                </Box>

            </Flex>
        )
    }
    return (
        // create a beautiful navbar
        <Flex p={4}>
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