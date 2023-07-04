import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateServiceDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
