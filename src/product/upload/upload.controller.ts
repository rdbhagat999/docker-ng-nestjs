import {Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import e, {Response} from "express";
import {extname} from "path";

@Controller()
export class UploadController {

    @Post('uploads')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
           destination: './uploads',
            filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void): void {
               const randomName = `${Math.ceil(Math.random()) + new Date().getTime() + Math.ceil(Math.random())}${extname(file.originalname)}`;
               return callback(null, randomName);
            }
        }),
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        return {
            url: `http://localhost:8000/api/${file.path}`
        }
    }

    @Get('uploads/:path')
    async getImage(@Param('path') path: string, @Res() response: Response) {
        return response.sendFile(path, { root: 'uploads' });
    }
}
