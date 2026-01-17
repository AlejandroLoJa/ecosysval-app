import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  // ✅ Crear publicación con archivos (imagen o video)
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 2, {
      storage: diskStorage({
        destination: './uploads/posts', // carpeta donde se guardarán los archivos
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createPost(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: { userId: number; content: string },
  ) {
    let imagePath: string | null = null;
    let videoPath: string | null = null;

    // Clasifica los archivos por tipo
    files?.forEach((file) => {
      if (file.mimetype.startsWith('image/')) imagePath = `/uploads/posts/${file.filename}`;
      if (file.mimetype.startsWith('video/')) videoPath = `/uploads/posts/${file.filename}`;
    });

    return this.postService.createPost(body.userId, body.content, imagePath, videoPath);
  }

  // ✅ Obtener publicaciones del usuario
  @Get('user/:userId')
  async getUserPosts(@Param('userId') userId: number) {
    return this.postService.getUserPosts(userId);
  }

  @Get()
  async getFeed() {
    return this.postService.getFeed();
  }


  // ✅ Editar publicación
  @Patch(':id')
  async editPost(@Param('id') id: number, @Body() body: { content: string }) {
    return this.postService.editPost(id, body.content);
  }

  // ✅ Eliminar publicación
  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }
}
