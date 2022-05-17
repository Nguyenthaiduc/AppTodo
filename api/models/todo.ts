import {uuid} from '../deps.ts'
import {toMap,fromMap } from '../middleware/utils.ts'

interface Todo {
    id : string;
    done: string | boolean;
    title:string;
    createdAt: string;
    updatedAt: string;
}

const FILE_PATH = '../db/todos/json'
type Result<T> = [T,undefined] | [undefined, Error]

export const getAll = async(): Promise<Todo[]> => {
    const data = await Deno.readFile(FILE_PATH);
    const decoder = new TextDecoder(); //Giải mã.
    
    return JSON.parse(decoder.decode(data)); //Convert JSON to Object
}

export const get = async({id}: Pick<Todo,"id">): Promise<Result<Todo>> => {
    const todos = await getAll();
    const todo = toMap(todos).get(id);

    if(!todo) {
        return [undefined,new Error("Can Find Item")];
    }
    return [todo,undefined];
}

export function updateAll(todos: Todo[]) : boolean {
    const encoder = new TextEncoder();
    Deno.writeFile(
        FILE_PATH,
        encoder.encode(JSON.stringify(todos)),
    )
    return true;
}

export async function create({title} : Pick<Todo,"title">):Promise<true> {
    const todos = await getAll();
    const id = uuid.generate(); // tạo id ngẫu nhiên từ uuid

    const now = new Date().toISOString();
    updateAll([
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

export async function update(params : Partial<Todo> & Pick<Todo,"id"> ) : Promise<Result<true>> {
    const todos = await getAll();
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
    updateAll(fromMap(todoMap));
    return [true,undefined]
}

export async function remove ({id} : Pick<Todo,"id">) : Promise<Result<true>> {
    const todos = await getAll();
    const todoMap = toMap(todos);

    if(!todoMap.has(id)) {
        return [undefined,new Error("Cannot find Iteam")]
    }
    todoMap.delete(id);
     updateAll(fromMap(todoMap));
    return [true,undefined]
}