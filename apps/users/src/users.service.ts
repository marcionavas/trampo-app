import { Injectable } from '@nestjs/common';
//import { helloCommon } from '../../../libs/common/src';

@Injectable()
export class UsersService {
  getHello(): string {
    return 'Hello Camila!';
  }
}
