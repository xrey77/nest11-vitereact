import { IsOptional, IsNumber, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationOptionsDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  readonly page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  readonly limit?: number = 5;

  get skip(): number {
    return (this.page! - 1) * this.limit!;
  }
}
