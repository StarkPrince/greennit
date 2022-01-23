import { Box, Button, Flex, Input, Link } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { Navbar } from "../components/Navbar";
import { Wrapper } from "../components/Wrapper";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Post } from "./post";
import { useState } from "react";

const Index = () =>
{
    const [variables, setVariables] = useState({
        limit: 5,
        cursor: null as null | string,
    });

    const [{ data }] = usePostsQuery({ variables });

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
            {data && data.posts.posts.map((post) =>
            (<div key={post.id}>
                <Post post={post} />
            </div>
            ))}
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
