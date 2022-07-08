import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Car } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Car[]> {
    return this.prisma.car.findMany({});
  }

  async create(createCarDto: CreateCarDto) {
    console.log(createCarDto)
    return await this.prisma.car.create({
      
      data: {
        name: createCarDto.name,
        description: createCarDto.description,
        color: createCarDto.color,
        price: createCarDto.price,
        year: createCarDto.year,
        brand: createCarDto.brand,
        license: createCarDto.license,
      },
    });
    
  }

  async findById(id: string): Promise<Car> {
    const carHere = await this.prisma.car.findUnique({
      where: {
        id: id,
      },
    });
    if (!carHere) {
      throw new NotFoundException(`Not founded car with id: ${id}`);
    }
    return carHere;
  }

  async update(id: string, dto: UpdateCarDto): Promise<Car> {
    await this.findById(id);
    try {
      return await this.prisma.car.update({
        where: {
          id: id,
        },
        data: {
          name: dto.name,
          description: dto.description,
          color: dto.color,
          price: dto.price,
          year: dto.year,
          isFavorite: dto.isFavorite,
        },
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
  }

  async delete(id: string):Promise<Car>{
    const car = await this.findById(id);
    try {
      await this.prisma.car.delete({
        where: {
          id,
        },
      });
      return car;
    } catch (err) {
      console.log(err);
      throw new NotFoundException(`Not founded car with id: ${id}`);
    }
  }
}
