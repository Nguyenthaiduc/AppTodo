import { RouterContext,Status} from '../deps.ts'

import { getParams} from '../middleware/utils.ts'
import { TodoRepository } from '../repositories/todo.repository.ts'
import {JwtService} from '../service/jwt.service.ts'

//trả về tất cả khi dùng METHOD 'GET'

export class TodoHandler {
    constructor(private todoRepository : TodoRepository,
                private jwtService : JwtService){}

    async getAll (ctx : RouterContext): Promise<void> {
        const userId = await this.jwtService.userId(ctx.cookies.get("jwt") || "");
        const todos = await this.todoRepository.findByUserId(userId);

       ctx.response.status = Status.OK;
       ctx.response.body = {
           todos,
       };

    }

    async get(ctx : RouterContext) : Promise<void> {
        const { id } = await getParams(ctx)
        const [todo,error] = await this.todoRepository.find(id)
        if(error) {
            ctx.response.status = Status.BadRequest;
            ctx.response.body = {
                error,
            }
            return;
        }
        ctx.response.status = Status.OK;
        ctx.response.body = {
            todo,
        }
    }

    async create(ctx : RouterContext) : Promise<void> {
        const params = await getParams(ctx)
        const userId = await this.jwtService.userId(ctx.cookies.get("jwt") || "")
        await this.todoRepository.create(params.title,userId)

        ctx.response.status = Status.OK;
        ctx.response.body = {
            message : 'successfully !'
        }
    }

    async update(ctx : RouterContext) : Promise<void> {
        const params = await getParams(ctx);
        const [_, error] = await this.todoRepository.update(params);
         if(error) {
            ctx.response.status = Status.BadRequest;
            ctx.response.body = {
                error,
            }
            return
         }
         ctx.response.status = Status.OK;
         ctx.response.body = {
             message: 'successfully !'
         }
       
    }

    async remove(ctx : RouterContext) : Promise<void> {
        const params = await getParams(ctx);
        const [_, error] = await this.todoRepository.remove(params)
        if(error) {
            ctx.response.status = Status.BadRequest;
            ctx.response.body = {
                error,
            }
            return
        }
        ctx.response.status = Status.OK;
        ctx.response.body = {
            message: 'successfully !',
        }
    }
                
}