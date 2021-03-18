import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import {plainToClass} from "class-transformer";

@Injectable()
export class DataPipe implements PipeTransform {
  // runs class transformation before sending request to controller
  transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if( ! metatype ) {
      return value;
    }

    return plainToClass(metatype, value);

  }
}
