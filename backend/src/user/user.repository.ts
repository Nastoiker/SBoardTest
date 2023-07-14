import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.model';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
