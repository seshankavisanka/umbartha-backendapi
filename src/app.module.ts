import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CounselorsModule } from './modules/counselors/counselors.module';
import { ServicesModule } from './modules/services/services.module';
import { EmailsModule } from './modules/emails/emails.module';
import { FilesModule } from './modules/files/files.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    CounselorsModule,
    ServicesModule,
    EmailsModule,
    FilesModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
