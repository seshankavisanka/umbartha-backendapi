import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Counselor } from './schemas/counselors.schema';
import { Model } from 'mongoose';
import { Service } from '../services/schemas/services.schema';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateCounselorDto } from './dto/create.counselors.dto';

@Injectable()
export class CounselorsService {
  constructor(
    @InjectModel(Counselor.name)
    private readonly counselorModel: Model<Counselor>,
    @InjectModel(Service.name)
    private readonly serviceModel: Model<Service>,
  ) {}

  create(createCounselorDto: CreateCounselorDto): Promise<Counselor> {
    const counselor = new this.counselorModel(createCounselorDto);
    return counselor.save();
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.counselorModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const counselor = await this.counselorModel.findOne({ _id: id }).exec();
    if (!counselor) {
      throw new NotFoundException(`Counselor #${id} not found`);
    }
    return counselor;
  }

  async update(
    id: string,
    updateCounselorDto: CreateCounselorDto,
  ): Promise<Counselor> {
    const exitingCounselor = await this.counselorModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateCounselorDto },
        { new: true },
      )
      .exec();

    if (!exitingCounselor) {
      throw new NotFoundException(`Counselor #${id} not found`);
    }
    return exitingCounselor;
  }

  async remove(id: string) {
    const counselor = await this.findOne(id);
    return counselor.deleteOne();
  }

  async uploadServiceToCounselor(counselorId: string, serviceId: string) {
    const service = await this.serviceModel.findById(serviceId).exec();
    if (!service) {
      throw new NotFoundException('Service not found');
    }

    const counselor = await this.counselorModel
      .findOneAndUpdate(
        { _id: counselorId },
        { $push: { services: [service.toObject()] } },
      )
      .exec();
    if (!counselor) {
      throw new NotFoundException('Counselor not found');
    }
    return counselor.save();
  }
}
