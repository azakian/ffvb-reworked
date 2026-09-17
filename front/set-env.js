require('dotenv').config();
const fs = require('fs');

const targetPath = './src/environments/environment.ts';
const isProduction = process.env.NODE_ENV === 'production';

const envConfigFile = `export const environment = {
  production: ${isProduction},
  supabaseUrl: "${process.env.SUPABASE_URL || ''}",
  supabaseKey: "${process.env.SUPABASE_KEY || ''}"
};
`;

fs.mkdirSync('./src/environments', { recursive: true });
fs.writeFileSync(targetPath, envConfigFile);
