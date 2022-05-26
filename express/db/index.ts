import dotenv from 'dotenv';
import { createConnection, Entity } from 'typeorm';

@Entity('todo')
export class Todo {

    id: string;

    title: string;

    description: string;

    startTime: Date;

    endTime : Date;

    userId : string;
}