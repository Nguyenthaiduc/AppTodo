import {uuid} from '../deps.ts';
import {toMap,fromMap } from '../middleware/utils.ts';
import { Todo } from '../models/todo.ts';

type updateParams = Partial<Todo> & Pick<Todo, "id">;
const FILE_PATH = Deno.env.get("DENO_ENV") === "test" ? "./db/todos_test.json": "./db/todos.json";

type Result<T> = [T,undefined] | [undefined, Error]
export class TodoRepository {


async findByUserId(userId : string): Promise<Todo[]> {
    const data = await Deno.readFile(FILE_PATH);
    const decoder = new TextDecoder(); //Giải mã.
    
    const todos = JSON.parse(decoder.decode(data)); //Convert JSON to Object
    return todos.filter((todo : Todo) => todo.userId == userId)
}


async find(id: string): Promise<Todo | null> {
    const todos = await this.findAll();
    const todo = toMap(todos).get(id);

    if(!todo) {
        return null;
    }
    return todo;
}

   private async  updateAll(todos: Todo[]): Promise<boolean> {
    const encoder = new TextEncoder();
    await Deno.writeFile(
        FILE_PATH,
        encoder.encode(JSON.stringify(todos, null, "\t")),
    )
    return true;
}

  async create(userId : string,title : string): Promise<boolean> {
    const todos = await this.findAll();
    const id = uuid.generate(); // tạo id ngẫu nhiên từ uuid

    const now = new Date().toISOString();
    try {
        await this.updateAll([
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
        return true;
    } catch {
      console.log("failed to create todo")
      return false;
    }
}

async update(params: updateParams): Promise<boolean> {
    const todos = await this.findAll();
    const todoMap = toMap(todos);
    const todo = todoMap.get(params.id);

    if(!todo) {
        return false;
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
        await this.updateAll(fromMap(todoMap));
        return true;

    }catch(err){
        console.log(err);
      return false;
    }
   
}

async delete(id: string): Promise<boolean> {
    const todos = await this.findAll();
    const todoMap = toMap(todos);

    if(!todoMap.has(id)) {
        return false;
    }
    todoMap.delete(id);
    await this.updateAll(fromMap(todoMap));
     return true;
}

private async findAll(): Promise<Todo[]> {
    const data = await Deno.readFile(FILE_PATH);
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(data));
  }
}