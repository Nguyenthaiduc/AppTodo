import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('user')
export class User {
	@ObjectIdColumn()
	id: string;

	@Column()
	userName: string;

	@Column()
	password: string;

	@Column()
	avatar: string;

	@Column()
	email: string;
}
