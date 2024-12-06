import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reseravations.repository';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationsRepository) {}
  async create(createReservationDto: CreateReservationDto, userId: string) {
    console.log({ createReservationDto });

    return await this.reservationRepository.create({
      ...createReservationDto,
      startDate: new Date(),
      endDate: new Date(),
      timeStamp: new Date(),
      userId,
    });
  }

  findAll() {
    return this.reservationRepository.find({});
  }

  findOne(_id: string) {
    return this.reservationRepository.findOne({ _id });
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  remove(_id: string) {
    return this.reservationRepository.findOneAndDelete({ _id });
  }
}
