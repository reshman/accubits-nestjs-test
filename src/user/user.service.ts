import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(data): Promise<any> {
    const user = await this.userRepository.save(data);
    if (!user) {
      throw new HttpException({ error: 'Bad Request' }, HttpStatus.BAD_REQUEST);
    }

    return {
      data: user,
      message: 'user added successfully',
      statusCode: HttpStatus.CREATED,
    };
  }
}
