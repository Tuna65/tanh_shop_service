export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.SERVICE_PORT ?? 8067,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
