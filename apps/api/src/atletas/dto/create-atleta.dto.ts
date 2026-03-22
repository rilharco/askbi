import { IsString, IsOptional, IsDateString, IsEnum, MaxLength, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum Genero {
  M = 'M',
  F = 'F',
}

export class CreateAtletaDto {
  @ApiProperty()
  @IsString()
  @MaxLength(150)
  nome!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dataNasc?: string;

  @ApiPropertyOptional({ enum: Genero })
  @IsOptional()
  @IsEnum(Genero)
  genero?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  morada?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(9)
  nif?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(15)
  telefone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  escalao?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  clubeId?: string;
}
