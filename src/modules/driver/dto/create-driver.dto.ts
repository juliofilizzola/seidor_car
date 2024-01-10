import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDriverDto {
  @IsString({
    message: 'name is invalid'
  })
  @IsNotEmpty({
    message: 'name is required'
  })
  name: string;

  @IsString({
    message: 'email is invalid'
  })
  @IsNotEmpty({
    message: 'email is required'
  })
  email: string;

  @IsString({
    message: 'phone is invalid'
  })
  @IsOptional()
  phone?: string;

  @IsString({
    message: 'document is invalid'
  })
  @IsNotEmpty({
    message: 'document is required'
  })
  document: string;

  @IsString({
    message: 'license is invalid'
  })
  @IsNotEmpty({
    message: 'license is required'
  })
  license: string;
}