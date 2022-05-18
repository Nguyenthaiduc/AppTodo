import {User} from '../models/user.ts'
import {toMap,toMapEmail} from '../middleware/utils.ts'
import { uuid } from '../deps.ts'

const  FILE_PATH = '../db/users.json'

export class UserRepository {

    public async find(id : string) {
        const users = await this.getAll();
        const user = toMap(users).get(id);

        if(!user) {
            return [undefined,new Error("Cannot find User !")]

        }
        return [user,undefined];
    }

    public async create ({first_name,last_name,email,password} : User) : Promise<boolean> {

        const users : User[] = await this.getAll();

        const id = uuid.generate(); // khoi tao uuid
        this.updateAll([
            ...users,
            {
                id,
                first_name,
                last_name,
                email,
                password,
            },
        ]);
        return true;
    }

    //Get All
     async getAll(): Promise<User[]> {
        const data = await Deno.readFile(FILE_PATH);
        const decoder = new TextDecoder();

        return JSON.parse(decoder.decode(data));
}

   async  updateAll(users: User[]) : Promise<boolean> {
    const encoder = new TextEncoder();
    Deno.writeFile(
        FILE_PATH,
        encoder.encode(JSON.stringify(users))
    );
    return true;
    }
}
