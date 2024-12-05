import { UsersRepository } from './user.repository';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  private async isExistingUser(email: string) {
    try {
      await this.usersRepository.findOne({ email });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('User already exists.');
  }
  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    await this.isExistingUser(email);

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usersRepository.create({
      email,
      password: hashedPassword,
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return await this.usersRepository.findOne(getUserDto);
  }
}
