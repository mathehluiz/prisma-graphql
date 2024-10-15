import { DomainException } from '@src/shared/core/exception/domain.exception';

export class ServiceUnavailableDomainException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
