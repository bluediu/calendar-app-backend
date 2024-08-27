/* Dtos */
import { RenewTokenDto } from '../../dtos';

/* Repositories */
import { AuthRepository } from '../../repositories';

/* Entities  */
import { TokenEntity } from '../../entities';

interface IRenewUseCase {
  execute(renewTokenDto: RenewTokenDto): Promise<TokenEntity>;
}

export class RenewToken implements IRenewUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(renewTokenDto: RenewTokenDto): Promise<TokenEntity> {
    const payload = await this.authRepository.renewToken(renewTokenDto);
    return payload;
  }
}
