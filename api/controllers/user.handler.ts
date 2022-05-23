import { RouterContext, Status } from "../deps.ts";
import { UserRepository } from '../repositories/user.repository.ts';
import {JwtService } from '../service/index.ts'

export class UserHandler {
    constructor(private userRepository: UserRepository,
                private jwtService : JwtService){}

    async getUser({response,cookies} : RouterContext) : Promise<void> {
        const id = await this.jwtService.userId(cookies.get('jwt') || '');

        if(id == '') {
            response.status = Status.BadRequest;
            response.body = {
                message: 'Cannot find user'
            }
            return
        }

        const [user,error] = await this.userRepository.find(id);
        if(error) {
            response.status = Status.BadRequest;
            response.body = {
                message: error
            }
            return
        }

        if(!user) {
            response.status = Status.BadRequest;
            response.body = {
                message: 'User not found'
            }
            return
        }

        response.status =Status.OK;
        response.body = {
            id,
            first_name : user.firstName,
            last_name : user.lastName,
            email : user.email
        }
    }
}