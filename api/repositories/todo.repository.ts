import {uuid} from '../deps.ts'
import {toMap,fromMap } from '../middleware/utils.ts'
import { Todo } from '../models/todo.ts'

const FILE_PATH = '../db/todos/json'
type Result<T> = [T,undefined] | [undefined, Error]
export class TodoRepository {



async getAll(): Promise<Todo[]> {
    const data = await Deno.readFile(FILE_PATH);
    const decoder = new TextDecoder(); //Giải mã.
    
    return JSON.parse(decoder.decode(data)); //Convert JSON to Object
}

async get(id: string): Promise<[Todo | undefined, Error | undefined]> {
    const todos = await this.getAll();
    const todo = toMap(todos).get(id);

    if(!todo) {
        return [undefined,new Error("Can Find Item")];
    }
    return [todo,undefined];
}

    updateAll(todos: Todo[]): boolean {
    const encoder = new TextEncoder();
    Deno.writeFile(
        FILE_PATH,
        encoder.encode(JSON.stringify(todos)),
    )
    return true;
}

  async create(title : string):Promise<true> {
    const todos = await this.getAll();
    const id = uuid.generate(); // tạo id ngẫu nhiên từ uuid

    const now = new Date().toISOString();
    this.updateAll([
        ...todos,
        {
            id,
            done: false,
            title,
            createdAt: now,
            updatedAt: now,
        },
    ]);
    return true;
}

 async update(params : Partial<Todo> & Pick<Todo,"id"> ) : Promise<Result<true>> {
    const todos = await this.getAll();
    const todoMap = toMap(todos);
    const current = todoMap.get(params.id);

    if(!current) {
        return [undefined,new Error("Cannot Find Item")]
    }

    todoMap.set(
        params.id,
        {
            ...current,
            ...params,
            updatedAt: new Date().toISOString(), //sẽ chuyển đổi một đối tượng thời gian thành một chuỗi theo tiêu chuẩn ISO.
        }
    );
    this.updateAll(fromMap(todoMap));
    return [true,undefined]
}

    async remove(id : string) : Promise<Result<true>> {
    const todos = await this.getAll();
    const todoMap = toMap(todos);

    if(!todoMap.has(id)) {
        return [undefined,new Error("Cannot find Iteam")]
    }
    todoMap.delete(id);
     this.updateAll(fromMap(todoMap));
    return [true,undefined]
}
}