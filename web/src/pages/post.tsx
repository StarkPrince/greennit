import React, { useEffect } from "react";
import { Badge, Button, Flex } from "@chakra-ui/core";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import { useDeletePostMutation, useUserQuery } from "../generated/graphql";
import { Form } from "formik";
import { OperationContext } from "@urql/core";

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


    return (
        <Box maxW='sm' p={4} mt={12} borderWidth='1px' borderRadius='lg' overflow='hidden' >
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
                        <Box
                            fontWeight='bold'
                            lineHeight='tight'
                            isTruncated
                            fontSize='large'
                        >
                            {post.title}
                        </Box>
                        <Box
                            fontWeight='light'
                            letterSpacing='wide'
                            mb="2"
                        >
                            <Badge borderRadius='full' px='2'>
                                {/* Posted by {data?.user.username} */}
                            </Badge>
                        </Box>
                        <Box md="6">
                            {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}
                            {post.text}
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
    );
};
