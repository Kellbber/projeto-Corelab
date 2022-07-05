import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return `server is running 🚀 -> check -> http://localhost:3333/api for swagger docs`;
  }
}
