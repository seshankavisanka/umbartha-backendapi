import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create.services.dto';
import { ServicesService } from './services.service';
import { UpdateServiceDto } from './dto/update.services.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  createService(@Body() createCounselorDto: CreateServiceDto) {
    return this.servicesService.create(createCounselorDto);
  }

  @Get()
  findAllServices() {
    return this.servicesService.findAll();
  }

  @Get(':serviceId')
  findOneService(@Param('serviceId') serviceId: string) {
    return this.servicesService.findOne(serviceId);
  }

  @Patch(':serviceId')
  updateOneService(
    @Param('serviceId') serviceId: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(serviceId, updateServiceDto);
  }

  @Delete(':serviceId')
  deleteOneService(@Param('serviceId') serviceId: string) {
    return this.servicesService.remove(serviceId);
  }
}
