import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from './schemas/services.schema';
import { Model } from 'mongoose';
import { CreateServiceDto } from './dto/create.services.dto';
import { UpdateServiceDto } from './dto/update.services.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
  ) {}

  create(createCounselorDto: CreateServiceDto): Promise<Service> {
    const service = new this.serviceModel(createCounselorDto);
    return service.save();
  }

  findAll() {
    return this.serviceModel.find().exec();
  }

  async findOne(id: string) {
    const service = await this.serviceModel.findOne({ _id: id }).exec();
    if (!service) {
      throw new NotFoundException(`Service #${id} note found`);
    }
    return service;
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const exitinngService = await this.serviceModel
      .findOneAndUpdate({ _id: id }, { $set: updateServiceDto }, { new: true })
      .exec();

    if (!exitinngService) {
      throw new NotFoundException(`Service #${id} note found`);
    }
    return exitinngService;
  }

  async remove(id: string) {
    const service = await this.findOne(id);
    return service.deleteOne();
  }
}
