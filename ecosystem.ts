interface AppConfig {
    name: string;
    script: string;
    instances: number;
    exec_mode: string;
    watch: boolean;
    env: {
      NODE_ENV: string;
      [key: string]: any; // This allows additional environment variables
    };
    env_staging?: {
      NODE_ENV: string;
      [key: string]: any; // Additional staging variables
    };
    env_production?: {
      NODE_ENV: string;
      [key: string]: any; // Additional production variables
    };
  }
  
  const ecosystem: AppConfig[] = [
    {
      name: 'common',
      script: 'server.ts',
      instances: 1,
      exec_mode: 'fork',
      watch: true,
      env: {
        NODE_ENV: 'local',
      },
      env_staging: {
        NODE_ENV: 'staging',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ];
  
  export default ecosystem;
  