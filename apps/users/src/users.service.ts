import { Injectable } from '@nestjs/common';
//import { helloCommon } from '@common';

@Injectable()
export class UsersService {
  getHello(): string {
    return 'Hello World!';
  }
}
