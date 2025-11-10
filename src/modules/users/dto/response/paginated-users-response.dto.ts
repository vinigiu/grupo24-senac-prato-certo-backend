import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';

export class PaginatedUsersDto {
  @ApiProperty({ type: [UserResponseDto] })
  data: UserResponseDto[];

  @ApiProperty({ example: 42 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;
}