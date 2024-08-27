import { TDynamicObject } from '../../../types';

export class RenewTokenDto {
  private constructor(public id: string, public name: string) {}

  static renew(object: TDynamicObject): RenewTokenDto {
    const { _id: id, name } = object;
    return new RenewTokenDto(id, name);
  }
}
