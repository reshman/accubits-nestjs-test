import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { IsUserAlreadyExist } from '../validaton-decorator/userAlreadyExists.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: number;

  @IsEmail()
  @IsUserAlreadyExist({ message: 'user already exists!' })
  email: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}