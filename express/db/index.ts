import { createConnection } from 'typeorm';
import { Todo } from '../models';
import { User } from '../models';

const connection = async () => {

    try {
        await createConnection({
            type: 'mongodb',
            host: 'localhost',
            port: 27017,
            database: 'Todo',
            useUnifiedTopology: true,
            entities: [User,Todo]
        })
        console.log("Connect Success !")

    } catch (err) {
        console.log("Connect Database Error",err);
    }

}

export default connection;




