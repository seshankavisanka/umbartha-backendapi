import {
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  S3,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async upload(fileName: string, file: Buffer) {
    const s3 = new S3({
      region: process.env.REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    });

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: file,
    };

    try {
      await s3.send(new PutObjectCommand(params));
      await s3.send(new GetObjectCommand(params));
      const objectUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${fileName}`;
      console.log(objectUrl);
      await s3.deleteObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
      });
    } catch (error) {
      throw 'Error uploading file: ' + error;
    }
  }
}
