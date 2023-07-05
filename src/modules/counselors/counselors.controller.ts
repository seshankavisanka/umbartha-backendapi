import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CounselorsService } from './counselors.service';
import { CreateCounselorDto } from './dto/create.counselors.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateTracingOptions } from 'trace_events';

@Controller('counselors')
export class CounselorsController {
  constructor(private readonly counselorsService: CounselorsService) {}

  @Post()
  createCounselor(@Body() createCounselorDto: CreateCounselorDto) {
    return this.counselorsService.create(createCounselorDto);
  }

  @Get()
  findAllCounselor(@Query() paginationQuery: PaginationQueryDto) {
    return this.counselorsService.findAll(paginationQuery);
  }

  @Get(':counselorId')
  findOneCounselor(@Param('counselorId') counselorId: string) {
    return this.counselorsService.findOne(counselorId);
  }

  @Patch(':counselorId')
  updateCounselor(
    @Param('counselorId') counselorId: string,
    @Body() updateCounselorDto: CreateCounselorDto,
  ) {
    return this.counselorsService.update(counselorId, updateCounselorDto);
  }

  @Delete(':counselorId')
  removeOneCounselor(@Param('counselorId') counselorId: string) {
    return this.counselorsService.remove(counselorId);
  }

  @Post(':id')
  upload(@Param('id') counselorId: string, @Body() serviceId: string) {
    return this.counselorsService.uploadServiceToCounselor(
      counselorId,
      serviceId,
    );
  }
}
