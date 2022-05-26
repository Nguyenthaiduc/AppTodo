import {
	Entity,
	ObjectIdColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Status } from '../interfaces';

@Entity('todo')
export class Todo {
    @ObjectIdColumn()
    id!: string;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    startTime!: Date;

    @Column()
    endTime!: Date;

    @Column()
    userId!: string;

    @Column()
    status!: Status;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
