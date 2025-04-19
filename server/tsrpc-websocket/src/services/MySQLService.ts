import mysql from 'mysql2/promise';

export class MySQLService {
    private static instance: MySQLService;
    private pool: mysql.Pool;

    private constructor() {
        // 创建连接池
        this.pool = mysql.createPool({
            host: '192.168.200.128',
            user: 'root',
            password: '123123',
            database: 'test', // 请根据实际情况修改数据库名
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        // 测试连接
        this.testConnection();
    }

    private async testConnection() {
        try {
            const connection = await this.pool.getConnection();
            console.log('MySQL 连接成功');
            connection.release();
        } catch (err) {
            console.error('MySQL 连接错误:', err);
        }
    }

    public static getInstance(): MySQLService {
        if (!MySQLService.instance) {
            MySQLService.instance = new MySQLService();
        }
        return MySQLService.instance;
    }

    public getPool(): mysql.Pool {
        return this.pool;
    }

    // 执行查询
    public async query(sql: string, params?: any[]): Promise<any> {
        const [rows] = await this.pool.execute(sql, params);
        return rows;
    }

    // 执行事务
    public async transaction(callback: (connection: mysql.PoolConnection) => Promise<void>): Promise<void> {
        const connection = await this.pool.getConnection();
        try {
            await connection.beginTransaction();
            await callback(connection);
            await connection.commit();
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }
} 