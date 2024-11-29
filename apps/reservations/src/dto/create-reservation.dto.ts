import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  // @IsDate()

  @IsNotEmpty()
  @IsString()
  placeId: string;

  @IsNotEmpty()
  @IsString()
  invoiceId: string;
}
