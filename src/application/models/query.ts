export interface MySQLConfig {
    mysql: {
        host: string;
        user: string;
        password: string;
        database: string;
        port: number;
        waitForConnections: boolean;
        connectionLimit: number;
        queueLimit: number;
      };
  } 