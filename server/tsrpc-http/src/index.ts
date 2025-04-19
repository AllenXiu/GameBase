import * as path from "path";
import { HttpServer } from "tsrpc";
import { serviceProto } from "./shared/protocols/serviceProto";
import { RedisService } from "./services/RedisService";

// Create the Server
const server = new HttpServer(serviceProto, {
    port: 8080,
    // Remove this to use binary mode (remove from the client too)
    json: true
});

// Initialize before server start
async function init() {
    // Auto implement APIs
    await server.autoImplementApi(path.resolve(__dirname, 'api'));

    // 初始化 Redis 服务
    const redisService = RedisService.getInstance();
    console.log('Redis 服务初始化完成');
};

// Entry function
async function main() {
    await init();
    await server.start();
};
main();