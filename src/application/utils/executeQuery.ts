import mysql from 'mysql2/promise';
import config from '../../config.json';
import { MySQLConfig } from '../models/query';

const pool = mysql.createPool((config as MySQLConfig).mysql);

type QueryResult<T> = Array<T>;

async function executeQuery<T>(query: string, params?: any[]): Promise<QueryResult<T>> {
  try {
    const [rows, fields] = await pool.execute(query, params);
    return rows as QueryResult<T>;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

export default executeQuery;
