import { Module } from '@nestjs/common';
import { CounselorsController } from './counselors.controller';
import { CounselorsService } from './counselors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Counselor, CounselorSchema } from './schemas/counselors.schema';
import { Service, ServiceSchema } from '../services/schemas/services.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Counselor.name, schema: CounselorSchema },
      { name: Service.name, schema: ServiceSchema },
    ]),
  ],
  controllers: [CounselorsController],
  providers: [CounselorsService],
})
export class CounselorsModule {}
