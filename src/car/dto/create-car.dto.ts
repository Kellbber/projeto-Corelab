import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';


export class CreateCarDto {

  @ApiProperty({
    description: 'name car',
    example: 'Gol',
  })
  name: string;


  @ApiProperty({
    description: 'year of the car',
    example: 2004,
  })
  year: number;


  @ApiProperty({
    description: 'brand car',
    example: 'Ford',
  })
  brand: string;


  @ApiProperty({
    description: 'license plate car',
    example: 'ILX-0948',
  })
  license: string;
  


  @IsPositive()
  @ApiProperty({
    description: 'price of the car',
    example: 17.9,
  })
  price: number;

  @ApiProperty({
    description: 'color of the car',
    example: 'red',
  })
  color: string;


  @ApiProperty({
    description: 'description of the car',
    example: 'version sport, good condition',
  })
  description: string;

  isFavorite?: boolean;
}
