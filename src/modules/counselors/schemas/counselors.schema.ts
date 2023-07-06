import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Service } from 'src/modules/services/schemas/services.schema';

export enum Title {
  Ms = 'Ms',
  Mrs = 'Mrs',
  Mr = 'Mr',
  Doctor = 'Doctor',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export enum LanguagesSpoken {
  English = 'English',
  Sinhala = 'Sinhala',
  Tamil = 'Tamil',
}

export enum SessionType {
  Online = 'Online',
  On_Premise = 'On-Premise',
}

export enum Status {
  DRAFT = 'DRAFT',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Schema()
export class Counselor extends Document {
  @Prop()
  title: Title;

  @Prop()
  profilePictureURL: string;

  @Prop()
  gender: Gender;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  displayName: string;

  @Prop()
  email: string;

  @Prop()
  hotline: string;

  @Prop()
  mobile: string;

  @Prop()
  dateOfBirth: string;

  @Prop()
  practiceStartedOn: string;

  @Prop({ type: [] })
  languagesSpoken: LanguagesSpoken[];

  @Prop({ type: [] })
  sessionType: SessionType[];

  @Prop({ type: [Object] })
  services: Object[];

  @Prop({ type: [String] })
  specialization: string[];

  @Prop({ type: [String] })
  credentials: string[];

  @Prop({
    type: [
      {
        licenseType: { type: String },
        licenseNumber: { type: String },
        licenseExpirationDate: { type: String },
      },
    ],
  })
  licenses: {
    licenseType: string;
    licenseNumber: string;
    licenseExpirationDate: string;
  }[];

  @Prop({
    type: {
      name: String,
      s3ObjectURL: String,
    },
  })
  profilePicture: { name: string; s3ObjectURL: string };
}

export const CounselorSchema = SchemaFactory.createForClass(Counselor);
