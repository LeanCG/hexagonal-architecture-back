import UserModel from '../../orm/model/userModel'; // Ajusta la ruta según tu estructura
import { UserRepository } from '../../../domain/UserRepository';
import { User } from '../../../domain/User';
import { UserId } from '../../../domain/UserId';
import { UserUid } from '../../../domain/UserUid';
import { Email } from '../../../domain/UserEmail';
import { UserPasword } from '../../../domain/UserPassword';
import { TypeState } from '../../../domain/UserTypeState';
import { UserCreateAt } from '../../../domain/UserCreatedAt';

export class UserORMRepository implements UserRepository {
    async getAll(): Promise<User[]> {
        const users = await UserModel.findAll();
        return users.map(user => this.mapToDomain(user));
    }

    async getOneById(id: UserId): Promise<User | null> {
        const user = await UserModel.findByPk(id.value);
        return user ? this.mapToDomain(user) : null;
    }

    async create(user: User): Promise<void> {
        const newUser = await UserModel.create(user.mapToPrimitives());
        await this.mapToDomain(newUser);
    }

    async edit(user: User): Promise<void> {
        const [numberOfAffectedRows, [updatedUser]] = await UserModel.update(user.mapToPrimitives(), {
            where: { id: user.id.value },
            returning: true,
        });
    }

    async delete(id: UserId): Promise<void> {
        const result = await UserModel.destroy({ where: { id: id.value } });
    }

    private mapToDomain(userModel: any): User {
        return new User(
            new UserId(userModel.id),
            new UserUid(userModel.uid),
            new Email(userModel.email),
            new UserPasword(userModel.password),
            new TypeState(userModel.typestate),
            new UserCreateAt(userModel.created_at)
        );
    }
}
