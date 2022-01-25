import { Upvote } from "../entities/Upvote";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  Ctx,
  Int,
  ObjectType,
} from "type-graphql";
import { LessThan } from "typeorm";
import { Post } from "../entities/Post";
import { MyContext } from "../types";
// import { User } from "src/entities/User";

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
}

@Resolver()
export class PostResolver {
  // @FieldResolver()
  // textSnippet(@Root() root: Post) {
  //   return root.text.slice(0, 500);
  // }

  // @FieldResolver(() => String)
  // async points(@Root() post: Post, @Ctx() { req }: MyContext) {
  //   let val = 0;
  //   if (req.session.userId) {
  //     const upvote = await Upvote.findOne({
  //       where: { postId: post.id, userId: req.session.userId },
  //     });
  //     val = upvote ? upvote.value : 0;
  //   }
  //   return val;
  // }
  // @FieldResolver(() => String)
  // email(@Root() user: User, @Ctx() { req }: MyContext) {
  //   if (req.session.userId === user.id) {
  //     return user.email;
  //   }
  //   return "";
  // }
  @Mutation(() => Boolean)
  async vote(
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    // if already voted, remove vote
    const realValue = value > 0 ? 1 : -1;
    const userId = req.session.userId;
    if (!req.session.userId) {
      console.log("\n\n\nUSER NOT FOUND\n\n\n");
      throw new Error("not authenticated");
    }
    const upvote = await Upvote.findOne({ where: { postId, userId } });

    if (upvote && upvote.value !== realValue) {
      await Upvote.update({ postId, userId }, { value: realValue });
      await Post.update(
        { id: postId },
        { points: () => `points + ${2 * realValue}` }
      );
    } else if (upvote && upvote.value === realValue) {
      await Upvote.delete({ postId, userId });
      await Post.update(
        { id: postId },
        { points: () => `points - ${realValue}` }
      );
    } else {
      await Upvote.insert({
        postId,
        userId,
        value: realValue,
      });
      await Post.update(
        { id: postId },
        { points: () => `points + ${realValue}` }
      );
    }
    return true;
  }

  // @Query(() => User, { nullable: true })
  // me(@Ctx() { req }: MyContext) {
  //   if (!req.session.userId) {
  //     return null;
  //   }
  //   return User.findOne(req.session.userId);
  // }
  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const posts = await Post.find({
      relations: ["creator"],
      take: realLimit + 1,
      skip: cursor ? parseInt(cursor) : 0,
      order: { createdAt: "DESC" },
      where: {
        createdAt: LessThan(new Date()),
      },
    });
    let updatedPosts = [];
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      console.log(post.id, req.session.userId);
      const upvote = await Upvote.findOne({
        where: { postId: post.id, userId: req.session.userId },
      });
      post.voteStatus = upvote ? upvote.value : 0;
      updatedPosts.push(post);
    }
    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimit + 1,
    };
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id") id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    if (!req.session.userId) {
      throw new Error("not authenticated");
    }
    console.log("in createpost", req.session.userId);
    return Post.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Post | null> {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      await Post.update({ id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    await Post.delete(id);
    return true;
  }
}
