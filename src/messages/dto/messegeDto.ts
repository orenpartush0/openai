import { IsString, IsNotEmpty } from 'class-validator';
import { Role } from '../enums/role';


export class MessageDto {
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  readonly role: Role;
}