import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsObject,
  IsPhoneNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import {
  Gender,
  LanguagesSpoken,
  SessionType,
  Status,
  Title,
} from '../schemas/counselors.schema';

class Licenses {
  @IsNotEmpty()
  @IsString()
  readonly licenseType: string;

  @IsNotEmpty()
  @IsString()
  readonly licenseNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly licenseExpirationDate: string;
}

class ProfilePicture {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsUrl()
  readonly s3ObjectURL: string;
}

export class CreateCounselorDto {
  @IsNotEmpty()
  @IsEnum(Title)
  readonly title: Title;

  @IsNotEmpty()
  @IsUrl()
  readonly profilePictureURL: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  readonly gender: Gender;

  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  readonly displayName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly hotline: string;

  @IsNotEmpty()
  @IsMobilePhone()
  readonly mobile: string;

  @IsNotEmpty()
  @IsDateString()
  readonly dateOfBirth: string;

  @IsNotEmpty()
  @IsDateString()
  readonly practiceStartedOn: string;

  @IsNotEmpty()
  @IsEnum(LanguagesSpoken, { each: true })
  @IsArray()
  readonly languagesSpoken: string[];

  @IsNotEmpty()
  @IsEnum(SessionType, { each: true })
  @IsArray()
  readonly sessionType: string[];

  @IsArray()
  @ValidateNested({ each: true })
  readonly services: Object[];

  @IsNotEmpty()
  @IsArray()
  readonly specialization: string[];

  @IsNotEmpty()
  @IsArray()
  readonly credentials: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  readonly licenses: Licenses[];

  @ValidateNested({ each: true })
  readonly profilePicture: ProfilePicture;

  @IsNotEmpty()
  @IsString()
  readonly status: Status;
}
