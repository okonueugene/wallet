import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';


@Injectable()

export class UserService {
private users: User[] = [];

constructor(@InjectModel('User') private readonly userModel: Model<User>) {}    

async createUser(name: string, email: string, password: string) {
    const newUser = new this.userModel({
        name: name,
        email: email,
        password: password
    });
    const result = await newUser.save();
    return result.id as string;
}

async findOneUser(userId: string): Promise<User> {
    let user;
    try {
        user = await this.userModel.findById(userId).exec();
    }
    catch (error) {
        throw new NotFoundException('Could not find user');
    }
    if (!user) {
        throw new NotFoundException('Could not find user');
    }

    return user.toObject({ getters: true });

}

async findAllUsers() {
    const users = await this.userModel.find().exec();
    return users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
    }));

}    
       
}
    
