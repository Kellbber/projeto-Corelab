import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString } from "class-validator";


export class CreateCarDto {
    
    @IsString()
    @ApiProperty({
        description: 'name car',
        example: 'Gol'
    })
    name: string;
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description:'year of the car',
        example: 2004
    })
    year: number;
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description: 'price of the car',
        example: 17.900
    })
    price: number;
    @IsString()
    @ApiProperty({
        description: 'color of the car',
        example: 'red'
    })
    color: string;
    @IsString()
    @ApiProperty({
        description: 'version sport, well maintained car '
    })
    description: string;
    @ApiProperty({
        description: 'id for add or remove car in the favorites'
    })
    favorite?: string;
}
