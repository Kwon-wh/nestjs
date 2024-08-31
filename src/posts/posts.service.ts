import { Injectable, NotFoundException } from '@nestjs/common';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

export interface PostModel {
    id: number;
    author: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
  }

let posts : PostModel[] = [
    {
      id: 1,
      author: 'test_author',
      title: 'test_title',
      content: 'test_content',
      likeCount: 100000,
      commentCount: 99999,
    },
    {
      id: 2,
      author: 'test_author2',
      title: 'test_title2',
      content: 'test_content2',
      likeCount: 100000,
      commentCount: 99999,
    },
    {
      id: 3,
      author: 'test_author3',
      title: 'test_title3',
      content: 'test_content3',
      likeCount: 100000,
      commentCount: 99999,
    }
  ]

@Injectable()
export class PostsService {

    getAllPosts(): PostModel[] {
        return posts;
    }

    getPostById(id: number) {
        const post = posts.find((posts) => posts.id === id);

        if(!post) {
        throw new NotFoundException();
        }
    return post;
    }

    postPost(author: string, title: string, content: string, ) {

      const post: PostModel = {
        id: posts[posts.length -1].id + 1,
        author,
        title,
        content,
        likeCount: 0,
        commentCount: 0,

      };

      posts = [
        ...posts,
        post,
      ]

      return post;
    }

    patchPost(
        id: string, 
        author: string, 
        title: string,
        content: string,
    ) {

        const postIndex = posts.findIndex((post) => post.id === +id);

        if (postIndex === -1) {
        return new NotFoundException;
        }

    
        const newPost = {
        ...posts[postIndex],
        }

        if (author) {
        newPost.author = author
        }

        if (title) {
        newPost.title = title
        }

        if(content) {
        newPost.content = content
        }


        posts[postIndex] = newPost 
        //{ ...posts[postIndex] }
        
        return newPost;
    }

    deletePost(
        id: string
    ) {
        const findIndex = posts.findIndex(post => post.id === +id)

        if (findIndex === -1) {
        return new NotFoundException();
        }
        posts.splice(findIndex, 1)

        // delete posts[findIndex]

        return id;
    }
}
