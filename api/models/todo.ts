interface Todo {
    id : string;
    done: string;
    title:string;
    createdAt: string;
    updatedAt: string;
}

const FILE_PATH = '../db/todos/json'

export const getAll = async(): Promise<Todo[]> => {
    const data = await Deno.readFile(FILE_PATH);
    const decoder = new TextDecoder(); //Giải mã.
    
    return JSON.parse(decoder.decode(data)); //Convert JSON to Object
}