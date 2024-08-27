import { TDynamicObject } from '../../../types';

export class RenewTokenDto {
  private constructor(public id: string, public name: string) {}

  static renew(object: TDynamicObject): RenewTokenDto {
    const { id, name } = object;
    return new RenewTokenDto(id, name);
  }
}
