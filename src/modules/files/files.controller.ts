import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  profilePictureUpload(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.filesService.upload(file.originalname, file.buffer);
  }
}
