import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@ApiTags('car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @ApiOperation({
    summary: 'create car',
  })
  create(@Body() createCarDto: CreateCarDto) {

    return this.carService.create(createCarDto);
  }

  @Get()
  @ApiOperation({
    summary: 'all cars',
  })
  findAll() {
    return this.carService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'view one car for ID',
  })
  findOne(@Param('id') id: string) {
    return this.carService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update car',
  })
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(id, updateCarDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete car',
  })
  remove(@Param('id') id: string) {
    return this.carService.delete(id);
  }
}
