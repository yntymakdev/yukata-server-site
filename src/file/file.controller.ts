import { Controller, HttpCode, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";
import { Auth } from "src/auth/decorators/auth-decorators";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody, ApiQuery } from "@nestjs/swagger";

@ApiTags("Файлы")
@ApiBearerAuth()
@Controller("files")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({
    summary: "Загрузить файлы",
    description: "Загрузка одного или нескольких файлов в указанную папку (опционально)",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Файлы для загрузки",
    schema: {
      type: "object",
      properties: {
        files: {
          type: "array",
          items: {
            type: "string",
            format: "binary",
          },
        },
      },
    },
  })
  @ApiQuery({ name: "folder", required: false, description: "Имя папки для сохранения файлов" })
  @HttpCode(200)
  @UseInterceptors(FilesInterceptor("files"))
  @Auth()
  @Post()
  async saveFiles(@UploadedFiles() files: Express.Multer.File[], @Query("folder") folder?: string) {
    return this.fileService.saveFiles(files, folder);
  }
}
