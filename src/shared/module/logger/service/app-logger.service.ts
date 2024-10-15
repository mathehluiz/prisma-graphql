import { Injectable, LoggerService } from '@nestjs/common';
import { Logger } from 'winston';
import { initLogger } from '../util/logger.factory';

type ContextType = Record<string, unknown> & { exception?: unknown };

@Injectable()
export class AppLogger implements LoggerService {
  private readonly logger: Logger;
  constructor() {
    this.logger = initLogger('application');
  }

  private getDefaultFields(exception?: unknown) {
    const { originClass: callerClass, originMethod: callerMethod } =
      this.getCallerContext(exception);

    return {
      defaultContext: {
        originClass: callerClass,
        originMethod: callerMethod,
      },
    };
  }

  private getCallerContext(exception?: unknown) {
    if (exception && exception instanceof Error) {
      const caller = exception.stack?.split('\n')[1].trim().split(' ')[1];
      const callerClass = caller?.split('.')[0];
      const callerMethod = caller?.split('.').slice(1).join('.');
      return {
        originClass: callerClass,
        originMethod: callerMethod,
      };
    }
    const stack = new Error().stack;
    const caller = stack?.split('\n')[4].trim().split(' ')[1];
    const callerClass = caller?.split('.')[0];
    const callerMethod = caller?.split('.').slice(1).join('.');

    return {
      originClass: callerClass,
      originMethod: callerMethod,
    };
  }

  log(message: string, context: ContextType = {}) {
    this.logger.info(message, {
      ...context,
      ...this.getDefaultFields(context.exception),
    });
  }
  error(message: string, context: ContextType = {}) {
    this.logger.error(message, {
      ...context,
      ...this.getDefaultFields(context.exception),
    });
  }
  warn(message: string, context: ContextType = {}) {
    this.logger.warn(message, {
      ...context,
      ...this.getDefaultFields(context.exception),
    });
  }
}
