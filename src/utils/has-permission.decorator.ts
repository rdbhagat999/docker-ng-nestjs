import {SetMetadata} from "@nestjs/common";

export const HasPermissionDecorator = (access: string) => SetMetadata('access', access);
