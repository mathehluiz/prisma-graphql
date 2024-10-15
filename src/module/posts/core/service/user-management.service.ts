import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../persistence/repository/user.repository';
import { UserModel } from '../model/user.model';
import { DomainException } from '@src/shared/core/exception/domain.exception';

export interface CreateUserDto {
  email: string;
  name: string;
}

@Injectable()
export class UserManagementService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(input: CreateUserDto) {
    const user = UserModel.create(input);
    await this.userRepository.save(user);
    return user;
  }

  async getUserById(id: string) {
    const user = this.userRepository.findOneBy({ id });
    if (!user) throw new DomainException('User not found');
    return user;
  }
}
