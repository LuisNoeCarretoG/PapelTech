const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env.railway') });

async function importDatabase() {
  try {
    const sqlPath = path.join(__dirname, 'papeltech_db.sql');

    if (!fs.existsSync(sqlPath)) {
      console.error('No se encontró el archivo papeltech_db.sql en backend/database');
      process.exit(1);
    }

    let sql = fs.readFileSync(sqlPath, 'utf8');

    // Quita comandos que pueden fallar en Railway
    sql = sql
      .replace(/CREATE DATABASE[\s\S]*?;/gi, '')
      .replace(/USE\s+`?papeltech_db`?\s*;/gi, '')
      .replace(/DROP DATABASE[\s\S]*?;/gi, '');

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true
    });

    console.log('Conectado a Railway. Importando base de datos...');
    await connection.query(sql);
    await connection.end();

    console.log('Base de datos importada correctamente a Railway.');
  } catch (error) {
    console.error('Error al importar la base de datos:');
    console.error(error.message);
    process.exit(1);
  }
}

importDatabase();