import { CardDto, CreateChargeDto } from '@app/common';
import { IsDefined, IsNotEmptyObject, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';

export class CreateReservationDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}
