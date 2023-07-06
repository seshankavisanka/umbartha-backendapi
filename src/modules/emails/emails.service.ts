import { Injectable } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { CreateCounselorDto } from '../counselors/dto/create.counselors.dto';

@Injectable()
export class EmailsService {
  async sendMail(Counselor: CreateCounselorDto) {
    const SES = new SESClient({
      region: process.env.REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    });

    const randomNumber = Math.floor(Math.random() * 10000);

    try {
      const send_ses = async () => {
        const emailToSend = new SendEmailCommand({
          Destination: {
            ToAddresses: ['seshankavisanka@gmail.com'],
          },
          Message: {
            Body: {
              Html: {
                Data: 'Your OTP number is ' + randomNumber,
              },
            },
            Subject: {
              Data: 'Verification for ' + Counselor.displayName,
            },
          },
          Source: 'seshankavisanka@gmail.com',
          ConfigurationSetName: 'backend-api',
        });

        return await SES.send(emailToSend);
      };
      if (send_ses()) {
        return 'send successfull';
      }
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }
}
