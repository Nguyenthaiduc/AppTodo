import {uuid} from '../deps.ts'
import {toMap,fromMap } from '../middleware/utils.ts'
import { Todo } from '../models/todo.ts'

const FILE_PATH = '../db/todos/json'
type Result<T> = [T,undefined] | [undefined, Error]
export class TodoRepository {


async findByUserId(userId : string): Promise<Todo[]> {
    const data = await Deno.readFile(FILE_PATH);
    const decoder = new TextDecoder(); //Giải mã.
    
    const todos = JSON.parse(decoder.decode(data)); //Convert JSON to Object
    return todos.filter((todo : Todo) => todo.userId == userId)
}


async find(id: string): Promise<[Todo | undefined, Error | undefined]> {
    const todos = await this.findAll();
    const todo = toMap(todos).get(id);

    if(!todo) {
        return [undefined,new Error("Can Find Todo")];
    }
    return [todo,undefined];
}

   private updateAll(todos: Todo[]): boolean {
    const encoder = new TextEncoder();
    Deno.writeFile(
        FILE_PATH,
        encoder.encode(JSON.stringify(todos, null, "\t")),
    )
    return true;
}

  async create(title : string,userId : string):Promise<[boolean | undefined, Error | undefined]> {
    const todos = await this.findAll();
    const id = uuid.generate(); // tạo id ngẫu nhiên từ uuid

    const now = new Date().toISOString();
    try {
        this.updateAll([
            ...todos,
            {
                id,
                userId,
                done: false,
                title,
                createdAt: now,
                updatedAt: now,
            },
        ]);
        return [true,undefined]
        
    }catch (err) {
        return [false, new Error(err)]
    }
}

 async update(params : Partial<Todo> & Pick<Todo,"id"> ) :Promise<[boolean | undefined, Error | undefined]> {
    const todos = await this.findAll();
    const todoMap = toMap(todos);
    const todo = todoMap.get(params.id);

    if(!todo) {
        return [undefined,new Error("Cannot Find Todo")]
    }
    try {
        todoMap.set(
            params.id,
            {
                ...todo,
                ...params,
                updatedAt: new Date().toISOString(), //sẽ chuyển đổi một đối tượng thời gian thành một chuỗi theo tiêu chuẩn ISO.
            }
        );
        this.updateAll(fromMap(todoMap));
        return [true, undefined];

    }catch(err){
        return [false, new Error(err)];
    }
   
}

    async remove(id : string) : Promise<Result<true>> {
    const todos = await this.findAll();
    const todoMap = toMap(todos);

    if(!todoMap.has(id)) {
        return [undefined,new Error("Cannot find Iteam")]
    }
    todoMap.delete(id);
     this.updateAll(fromMap(todoMap));
    return [true,undefined]
}

private async findAll(): Promise<Todo[]> {
    const data = await Deno.readFile(FILE_PATH);
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(data));
  }
}