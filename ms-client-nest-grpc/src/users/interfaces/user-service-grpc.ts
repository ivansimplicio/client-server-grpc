import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export interface UserServiceGRPC {
  create(data: {
    name: string;
    email: string;
    password: string;
    age: number;
  }): Observable<User>;

  update(data: {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    age?: number;
  }): Observable<User>;

  findOne(data: { id: string }): Observable<User>;

  findAll(data: any): Observable<User[]>;

  delete(data: { id: string }): Observable<void>;
}
