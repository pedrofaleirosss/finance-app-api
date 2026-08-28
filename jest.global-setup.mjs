import { execSync } from 'child_process';

async function init() {
  execSync('docker compose up -d --wait postgres-test');
  execSync('npx dotenv -e .env.test -- npx prisma db push');
}

export default init;
