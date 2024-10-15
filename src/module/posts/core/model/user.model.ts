import { randomUUID } from 'crypto';

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export class UserModel {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  private constructor(data: UserModel) {
    Object.assign(this, data);
  }

  static create(
    data: WithOptional<UserModel, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): UserModel {
    return new UserModel({
      ...data,
      id: data.id ? data.id : randomUUID(),
      createdAt: data.createdAt ? data.createdAt : new Date(),
      updatedAt: data.updatedAt ? data.updatedAt : new Date(),
      deletedAt: data.deletedAt ? data.deletedAt : null,
    });
  }

  static createFrom(data: UserModel): UserModel {
    return new UserModel(data);
  }
}
