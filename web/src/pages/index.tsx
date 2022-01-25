import { Box, Button, Flex, Input, Link, useColorMode } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { Navbar } from "../components/Navbar";
import { Wrapper } from "../components/Wrapper";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Post } from "./post";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Index = () =>
{
    const { colorMode } = useColorMode();
    const [variables, setVariables] = useState({
        limit: 5,
        cursor: null as null | string,
    });

    const [{ data }] = usePostsQuery({ variables });
    const notify = (message: string) => toast.success(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    if (!data) {
        return <div>you got query failed for some reason</div>;
    }
    return (<>
        <Navbar />
        <Wrapper>
            <NextLink href="/create-post">
                <Flex>
                    <Input placeholder="Create Post" />
                </Flex>
            </NextLink>
            {!data && <div>loading...</div>}
            {console.log(data.posts.bonus)}
            {data && data.posts.posts.map((post) =>
            (<div key={post.id}>
                <Post post={post} notify={notify} />
            </div>
            ))}
            {/* set coloured theme to toast container */}
            <ToastContainer theme={colorMode == "light" ? "light" : "dark"} />
            {data && data.posts.hasMore && (
                <Flex>
                    <Button onClick={() => setVariables(
                        {
                            ...variables,
                            cursor: data!.posts.posts[data!.posts.posts.length - 1].createdAt
                        })} my={6} mx="auto">
                        Load More
                    </Button>
                </Flex>
            )}
        </Wrapper>
    </>);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
