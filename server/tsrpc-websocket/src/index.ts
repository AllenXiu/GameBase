import * as path from "path";
import { WsServer } from "tsrpc";
import { serviceProto } from './shared/protocols/serviceProto';
import { MySQLService } from './services/MySQLService';
import { RedisService } from './services/RedisService';

// Create the Server
export const server = new WsServer(serviceProto, {
    port: 3030,
    // Remove this to use binary mode (remove from the client too)
    json: true
});

// Initialize before server start
async function init() {
    await server.autoImplementApi(path.resolve(__dirname, 'api'));

    // 初始化 MySQL 服务
    const mysqlService = MySQLService.getInstance();
    console.log('MySQL 服务初始化完成');

    // 初始化 Redis 服务
    const redisService = RedisService.getInstance();
    console.log('Redis 服务初始化完成');
};

// Entry function
async function main() {
    await init();
    await server.start();
}
main();