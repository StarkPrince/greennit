import { Flex, Input } from "@chakra-ui/core";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { Navbar } from "../components/Navbar";
import { Wrapper } from "../components/Wrapper";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { Link } from "@chakra-ui/core";

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
            {data && data.posts.map((post) => (
                <Box maxW='sm' p={4} mt={12} borderWidth='1px' borderRadius='lg' overflow='hidden' key={post.id}>
                    <Box p='6'>
                        <Flex p="auto" m={2}>
                            <Box centerContent mr={6}>
                                <Box>
                                    <TriangleUpIcon />
                                </Box>
                                <Box>
                                    {post.points}
                                </Box>
                                <Box>
                                    <TriangleDownIcon />
                                </Box>
                            </Box>
                            <Box p={4} m={4}>
                                {/* <Badge borderRadius='full' px='2'>
                            </Badge> */}
                                <Box
                                    color='gray.500'
                                    fontWeight='semibold'
                                    letterSpacing='wide'
                                    fontSize='xs'
                                    ml='2'
                                >
                                    Posted by {post.creatorId}
                                </Box>
                                <Box
                                    mt='1'
                                    fontWeight='semibold'
                                    as='h4'
                                    lineHeight='tight'
                                    isTruncated
                                    mb="2"
                                >
                                    <b>
                                        {post.title}
                                    </b>
                                </Box>
                                <Box >
                                    {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}
                                    {post.text}
                                    {/* <Box as='span' color='gray.600' fontSize='sm'>
                                / wk
                            </Box> */}
                                </Box>
                            </Box>

                        </Flex>

                        {/* 
                        <Box display='flex' mt='2' alignItems='center'>
                            {Array(5)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={i < property.rating ? 'teal.500' : 'gray.300'}
                                    />
                                ))}
                            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                {property.reviewCount} reviews
                            </Box>
                        </Box> */}
                    </Box>
                </Box>
            ))}
        </Wrapper >
    </>
    )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
