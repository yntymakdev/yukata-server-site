import { Controller, HttpCode, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { stringify } from 'querystring';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {

    @HttpCode(200)
    @UseInterceptors(FilesInterceptor('files'))
    @Auth()
    @Post()
    async saveFiles(@UploadedFile() files: Express.Multer.File[],@Query() folder?:string){
return this.fileService.saveFiles(files.folder)

    }
  }
}
