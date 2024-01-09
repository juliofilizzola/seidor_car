import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'limit pagination, min value 1' })
  @Max(300, { message: 'limit pagination, max value 300' })
  limit?: number;
}