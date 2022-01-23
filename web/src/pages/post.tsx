import { Badge, Button, Flex, Heading } from "@chakra-ui/core";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { useDeletePostMutation } from "../generated/graphql";

interface WrapperProps
{
    // props contain post which has a title,text body, and id
    post: {
        id: number;
        title: string;
        text: string;
        points: number;
        creatorId: number;
        createdAt: string;
        updatedAt: string;
    };

}

export const Post: React.FC<WrapperProps> = ({ post }) =>
{
    const [, deletePost] = useDeletePostMutation();
    return (<>
        <Box p={1} shadow="dark-lg" borderWidth='1px' maxW='sm' mt={12} borderRadius='lg' overflow='hidden' >
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
                    <Box pl={4} m={3}>
                        <Heading fontSize='xl'>
                            {post.title}
                        </Heading>
                        <Box
                            fontWeight='light'
                            letterSpacing='wide'
                            mb="4"
                        >
                            <Badge borderRadius='full' px='2'>
                                Posted by {post.creator.username}
                            </Badge>
                        </Box>
                        <Box md="6">
                            {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}
                            {post.text.slice(0, 500) + "..."}
                            {/* <Box as='span' color='gray.600' fontSize='sm'>
                                / wk
                            </Box> */}
                        </Box>
                        <Button mt="6" onClick={() => { deletePost({ id: post.id }) }}>
                            Delete Post
                        </Button>
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
    </>
    );
};
