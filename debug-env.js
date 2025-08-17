import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '.env.development.local');

console.log('Manual debug load path:', envPath);
console.log('Exists?', fs.existsSync(envPath));
console.log('Raw file contents:\n', fs.readFileSync(envPath, 'utf-8'));

config({ path: envPath });

console.log('After dotenv:');
console.log('  PORT=', process.env.PORT);
console.log('  NODE_ENV=', process.env.NODE_ENV);
console.log('  DB_URI=', process.env.DB_URI);
console.log('  JWT_SECRET=', process.env.JWT_SECRET);
console.log('  JWT_EXPIRES_IN=', process.env.JWT_EXPIRES_IN);

// node --experimental-specifier-resolution=node debug-env.js