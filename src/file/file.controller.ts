import { Controller, HttpCode, Post, UploadedFiles, UseInterceptors, Query } from "@nestjs/common";
import { FileService } from "./file.service";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @HttpCode(200)
  @UseInterceptors(FilesInterceptor("files"))
  @Post()
  async saveFiles(@UploadedFiles() files: Express.Multer.File[], @Query("folder") folder?: string) {
    return this.fileService.saveFiles(files, folder);
  }
}
