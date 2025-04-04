const logLevels = {
  DEV: "DEV",
  DEV_ERROR: "DEV_ERROR",
  PROD: "PROD",
  PROD_ERROR: "PROD_ERROR",
} as const;

type LogLevel = keyof typeof logLevels;

class Logger {
  private readonly timestamp: boolean;
  private readonly prefix: string;

  constructor(options: { timestamp?: boolean; prefix?: string } = {}) {
    this.timestamp = options.timestamp ?? true;
    this.prefix = options.prefix ?? "";
  }

  private getTimestamp(): string {
    if (!this.timestamp) return "";
    return `[${new Date().toISOString()}]`;
  }

  private logMessage(level: LogLevel, message: string, ...args: any[]): void {
    const timestamp = this.getTimestamp();
    const prefix = this.prefix ? `[${this.prefix}]` : "";

    if (level === logLevels.DEV_ERROR || level === logLevels.PROD_ERROR) {
      console.error(timestamp, prefix, [level], message, ...args);
    } else {
      console.log(timestamp, prefix, [level], message, ...args);
    }
  }

  dev(message: string, ...args: any[]): void {
    // only log in development mode
    if (__DEV__) {
      this.logMessage(logLevels.DEV, message, ...args);
    }
  }

  prod(message: string, ...args: any[]): void {
    this.logMessage(logLevels.PROD, message, ...args);
  }

  error(message: string, ...args: any[]): void {
    if (__DEV__) {
      this.logMessage(logLevels.DEV_ERROR, message, ...args);
    }
  }

  errorProd(message: string, ...args: any[]): void {
    this.logMessage(logLevels.PROD_ERROR, message, ...args);
  }
}

// export const Log = new Logger({prefix: getAppName()});

export const Log = new Logger();
