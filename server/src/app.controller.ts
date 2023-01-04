import { Controller, Post,  UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

@Controller()
export class AppController {
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './static',
      filename: (req, file, cb) => cb(null, file.originalname)
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file
  }
}