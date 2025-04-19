import Redis from 'ioredis';

export class RedisService {
    private static instance: RedisService;
    private redis: Redis;

    private constructor() {
        // 创建 Redis 连接
        this.redis = new Redis({
            host: '192.168.200.128', // Redis 服务器地址
            port: 6379,              // Redis 服务器端口
            password: '123123', // Redis 密码
            db: 0,                   // 数据库索引
        });

        // 监听连接事件
        this.redis.on('connect', () => {
            console.log('Redis 连接成功');
        });

        this.redis.on('error', (err) => {
            console.error('Redis 连接错误:', err);
        });
    }

    public static getInstance(): RedisService {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }
        return RedisService.instance;
    }

    public getClient(): Redis {
        return this.redis;
    }

    // 设置键值对
    public async set(key: string, value: string, expireSeconds?: number): Promise<void> {
        if (expireSeconds) {
            await this.redis.setex(key, expireSeconds, value);
        } else {
            await this.redis.set(key, value);
        }
    }

    // 获取键值
    public async get(key: string): Promise<string | null> {
        return await this.redis.get(key);
    }

    // 删除键
    public async del(key: string): Promise<void> {
        await this.redis.del(key);
    }

    // 检查键是否存在
    public async exists(key: string): Promise<boolean> {
        const result = await this.redis.exists(key);
        return result === 1;
    }
} 