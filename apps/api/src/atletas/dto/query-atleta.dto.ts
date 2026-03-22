import { IsOptional, IsUUID, IsString, IsInt, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QueryAtletaDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  clubeId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  escalao?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}
