import { Badge, Button, Flex, Heading, IconButton } from "@chakra-ui/core";
import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useDeletePostMutation, useVotePostMutation } from "../generated/graphql";
import 'react-toastify/dist/ReactToastify.css';
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
    notify: any
}

export const Post: React.FC<WrapperProps> = ({ post, notify }) =>
{
    const [voteStatus, setVoteStatus] = useState(post.voteStatus);
    const [, deletePost] = useDeletePostMutation();
    const [, vote] = useVotePostMutation();
    return (<>
        {console.log(voteStatus)}
        <Box p={1} shadow="dark-lg" borderWidth='1px' maxW='sm' mt={12} borderRadius='lg' overflow='hidden' >
            <Box p='6'>
                <Flex p="auto" m={2}>
                    <Flex direction={"column"} mr={6} alignItems={"center"}>
                        {/* NOTEIT: Used react toastify to show notifications */}
                        <IconButton
                            onClick={() =>
                            {
                                if (voteStatus == 1) {
                                    setVoteStatus(0);
                                }
                                else {
                                    setVoteStatus(1);
                                }
                                vote({ postId: post.id, value: 1 });
                                notify("Your upvote as been processed")
                            }}
                            aria-label="upvote"
                            icon="triangle-up"
                            variantColor={(voteStatus == 1) ? "green" : "gray"}
                        />
                        {post.points + voteStatus}, {!voteStatus ? "not voted" : voteStatus == 1 ? "upvoted" : "downvoted"}
                        <IconButton
                            onClick={() =>
                            {
                                if (voteStatus == -1) {
                                    setVoteStatus(0);
                                }
                                else {
                                    setVoteStatus(-1);
                                }
                                vote({ postId: post.id, value: -1 });
                                notify("Your downvote as been processed");
                            }}
                            aria-label="downvote"
                            icon="triangle-down"
                            variantColor={(voteStatus == -1) ? "red" : "gray"}
                        />
                    </Flex>
                    <Box pl={4}>
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
                            {post.text.slice(0, 500) + (post.text.length > 50 ? "..." : "")}
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
