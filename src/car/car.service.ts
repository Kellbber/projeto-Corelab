import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(private readonly prisma: PrismaService){}

  findAll() {
    return this.prisma.car.findMany({
      include:{
        favorite:true
      }
    });
  }

  async create(createCarDto: CreateCarDto) {
    return await this.prisma.car.create({
      data:{
        name: createCarDto.name,
        description: createCarDto.description,
        color: createCarDto.color,
        price: createCarDto.price,
        year: createCarDto.year
      },
      include:{
        favorite: true
      }
    }).catch(this.handleError)
  }


  findOne(id: string) {
    return `This action returns a #${id} car`;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: string) {
    return `This action removes a #${id} car`;
  }

  handleError(error: Error): undefined {
    console.error(error);
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    throw new UnprocessableEntityException(
      lastErrorLine || `Algum erro inesperado ocorreu`,
    );
  }
}

