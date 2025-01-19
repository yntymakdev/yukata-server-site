import { Injectable } from "@nestjs/common";

@Injectable()
export class FileService {
  async saveFiles(files: Express.Multer.File[], folder: string = `products`) {
    const upload;
  }
}
