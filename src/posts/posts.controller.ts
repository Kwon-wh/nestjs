import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { PostModel, PostsService } from './posts.service';
import { NotFoundError } from 'rxjs';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): PostModel[] {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }

  @Post()
  postPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,) {
      return this.postsService.postPost(author, title, content);
  } 

  @Patch(':id')
  patchPost(
    @Param('id') id: string,
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ){
    return this.postsService.patchPost(id, author, title, content);
  }

  @Delete(':id')
  deletePost(
    @Param('id') id: string,
  ) {
    return this.postsService.deletePost(id);
  }
}
