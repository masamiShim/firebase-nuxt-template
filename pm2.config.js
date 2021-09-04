module.exports = {
  apps: [
    {
      script: 'npm run start',
      // cwd: 'xxxxxxxxx',
      error_file: 'pm2_web_logs/err.log',
      out_file: 'pm2_web_logs/out.log',
      log_file: 'pm2_web_logs/combined.log',
      env: {
        TZ: 'Asia/Tokyo',
        NODE_ENV: 'development',
        name: 'dev-web',
      },
      env_production: {
        TZ: 'Asia/Tokyo',
        NODE_ENV: 'production',
        name: 'prod-web',
      },
    },
  ],
}