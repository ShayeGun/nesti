import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/role.enum';

export type CatDocument = HydratedDocument<User>;

@Schema({
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
            if (ret.password) delete ret.password;
        }
    }
})
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ select: false })
    refreshToken: string;

    @Prop({ default: Role.User })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
