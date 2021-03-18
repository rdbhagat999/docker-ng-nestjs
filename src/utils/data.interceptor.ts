import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import {classToPlain} from "class-transformer";
import {map} from "rxjs/operators";

@Injectable()
export class DataInterceptor implements NestInterceptor {
  // runs class transformation before sending response to frontend
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => {
      return classToPlain(data);
    }));
  }
}
