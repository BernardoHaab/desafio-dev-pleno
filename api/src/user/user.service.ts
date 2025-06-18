import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.interface.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUserById(id: number) {
    return this.userRepository.findById(id);
  }
}
