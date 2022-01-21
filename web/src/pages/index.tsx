import { Flex, Input } from "@chakra-ui/core";

import { withUrqlClient } from "next-urql";
import { Navbar } from "../components/Navbar";
import { Wrapper } from "../components/Wrapper";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { Link } from "@chakra-ui/core";
import { Post } from "./post";

const Index = () =>
{
    const [{ data }] = usePostsQuery();
    return (<>
        <Navbar />
        <Wrapper>
            <NextLink href="/create-post">
                <Link>
                    <Input placeholder="Create Post" />
                </Link>
            </NextLink>
            {!data && <div>loading...</div>}
            {data && data.posts.map((post) =>
            (<div key={post.id}>
                <Post post={post} />
            </div>
            ))}
        </Wrapper >
    </>
    )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
