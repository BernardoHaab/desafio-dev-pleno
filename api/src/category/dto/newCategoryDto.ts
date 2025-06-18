import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class NewCategoryDto {
  @ApiProperty({ example: 'Despesas fixas' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Categoria para despesas fixas mensais',
    required: false,
  })
  @IsString()
  description: string | null;

  @ApiProperty({ example: '#FF5733' })
  @IsNotEmpty()
  @IsHexColor({ message: 'A cor deve estar no formato hex' })
  color: string;
}
