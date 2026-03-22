import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'instrutor@shotokan.pt' })
  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  password!: string;
}
