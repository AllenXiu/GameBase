# 游戏框架项目

## 项目概述
这是一个基于Cocos Creator 3.8.4开发的游戏框架项目，采用TypeScript语言开发。项目采用模块化设计，提供了完整的游戏开发基础框架，包含客户端和服务器端。

## 项目结构
```
assets/                 # 客户端资源
├── App/               # 应用程序主入口
└── Core/              # 核心框架
    └── Scripts/       # 核心脚本
        ├── Components/# 通用组件
        ├── Managers/  # 管理器
        ├── UI/       # UI相关
        └── Utils/    # 工具类

server/                # 服务器端
├── tsrpc-http/       # HTTP 服务器
└── tsrpc-websocket/  # WebSocket 服务器
```

## 核心功能模块
### 客户端
项目包含以下核心管理器：
- 音频管理器 (AudioMgr)：处理游戏音频
- 分包管理器 (BundleMgr)：管理资源分包
- 数据管理器 (DataMgr)：处理游戏数据
- 事件管理器 (EventMgr)：处理事件通信
- 语言管理器 (LangMgr)：处理多语言
- 日志管理器 (LogMgr)：处理日志输出
- 资源管理器 (ResMgr)：管理游戏资源
- 时间管理器 (TimeMgr)：处理时间相关
- UI管理器 (UIRoot)：管理游戏界面

### 服务器端
- HTTP 服务器：提供 RESTful API 服务
- WebSocket 服务器：提供实时通信服务
- MySQL 数据库服务：数据持久化存储
- Redis 缓存服务：高速缓存和会话管理

## 技术栈
### 客户端
- 引擎：Cocos Creator 3.8.4
- 开发语言：TypeScript
- 依赖管理：npm
- 加密库：crypto-es

### 服务器端
- 框架：TSRPC
- 开发语言：TypeScript
- 数据库：MySQL
- 缓存：Redis
- 依赖管理：npm

## 开发环境要求
### 客户端
- Node.js
- Cocos Creator 3.8.4
- TypeScript

### 服务器端
- Node.js
- MySQL 服务器
- Redis 服务器
- TypeScript

## 服务器配置
### MySQL 配置
- 主机：192.168.200.128
- 用户名：root
- 密码：xiaosiadmin123
- 数据库：test

### Redis 配置
- 主机：192.168.200.128
- 端口：6379
- 密码：xiaosiadmin123
- 数据库索引：0

## 框架特点
1. 模块化设计：各功能模块独立管理
2. 分包加载：支持资源分包管理
3. 多语言支持：内置语言管理器
4. 完整的资源管理：包含音频、UI等资源管理
5. 事件驱动架构：使用事件管理器进行模块间通信
6. 完整的服务器支持：包含 HTTP 和 WebSocket 服务
7. 数据持久化：使用 MySQL 进行数据存储
8. 高性能缓存：使用 Redis 进行缓存管理

## 使用说明
1. 克隆项目到本地
2. 配置服务器环境：
   - 安装并启动 MySQL 服务器
   - 安装并启动 Redis 服务器
   - 配置数据库连接信息
3. 启动服务器：
   ```bash
   # 启动 HTTP 服务器
   cd server/tsrpc-http
   npm install
   npm start

   # 启动 WebSocket 服务器
   cd server/tsrpc-websocket
   npm install
   npm start
   ```
4. 使用 Cocos Creator 3.8.4 打开项目
5. 安装客户端依赖：`npm install`
6. 运行项目

## 开发指南
1. 创建新游戏时，建议在 assets 目录下创建新的子游戏目录
2. 使用 Core 框架提供的各种管理器进行开发
3. 遵循模块化设计原则，保持代码结构清晰
4. 服务器端开发遵循 TSRPC 框架规范

## 服务器端开发示例
### 1. MySQL 使用示例
```typescript
import { MySQLService } from './services/MySQLService';

// 获取 MySQL 服务实例
const mysqlService = MySQLService.getInstance();

// 执行查询
const users = await mysqlService.query('SELECT * FROM users WHERE id = ?', [1]);

// 执行事务
await mysqlService.transaction(async (conn) => {
    await conn.execute('INSERT INTO users (name) VALUES (?)', ['test']);
    await conn.execute('UPDATE users SET age = ? WHERE name = ?', [20, 'test']);
});
```

### 2. Redis 使用示例
```typescript
import { RedisService } from './services/RedisService';

// 获取 Redis 服务实例
const redisService = RedisService.getInstance();

// 设置键值对
await redisService.set('key', 'value');
await redisService.set('key', 'value', 60); // 60秒后过期

// 获取值
const value = await redisService.get('key');

// 删除键
await redisService.del('key');

// 检查键是否存在
const exists = await redisService.exists('key');
```

## 组件使用说明

### 1. 多语言组件

#### I18nLabel（多语言文本组件）
```typescript
// 在场景中添加Label或RichText组件
// 添加I18nLabel组件
// 设置多语言key
@ccclass("I18nLabel")
@requireComponent(Label)
@requireComponent(RichText)
export class I18nLabel extends I18nBase {
    @property({ displayName: "多语言 key" })
    private code: string = "";
}
```

#### I18nSprite（多语言图片组件）
```typescript
// 在场景中添加Sprite组件
// 添加I18nSprite组件
// 设置不同语言的SpriteFrame
@ccclass("I18nSprite")
@requireComponent(Sprite)
export class I18nSprite extends I18nBase {
    @property({ displayName: "多语言精灵数据列表", type: [I18nSpriteData] })
    public spList: I18nSpriteData[] = [];
}
```

### 2. 网络组件

#### Http（HTTP请求组件）
```typescript
// GET请求示例
Http.get('http://example.com/api', { id: 1 }, (data) => {
    console.log(data);
});

// POST请求示例
Http.post('http://example.com/api', { name: 'test' }, (data) => {
    console.log(data);
});
```

#### WebSocket（WebSocket组件）
```typescript
// 创建WebSocket实例
const wsClient = new Ws();

// 设置回调
wsClient.onConnected = () => console.log('连接成功');
wsClient.onMessage = (msg) => console.log('收到消息:', msg);

// 连接服务器
const url = 'ws://127.0.0.1';
const port = 5000;
wsClient.connect(url, port);

// 发送数据
wsClient.send('Hello World');

// 发送二进制数据
const buffer = new Uint8Array([1, 2, 3]);
wsClient.sendBuffer(1, buffer);
```

## 示例代码
### 1. 日志管理
```typescript
app.log.info('日志示例_数字', 1);
app.log.info('日志示例_文本', "文本内容");
app.log.info('日志示例_对象', { id: 1, name: '名称' });
```

### 2. 数据管理
```typescript
// 存储数据
app.data.setData('key_num', 1);
app.data.setData('key_str', "文本内容");
app.data.setData('key_obj', { id: 1, name: '名称' });

// 读取数据
const num = app.data.getNumber('key_num');
const str = app.data.getText('key_str');
const obj = app.data.getJSON('key_obj');
```

### 3. 分包管理
```typescript
// 加载分包
app.bundle.getBundle('SubGame_001', (progress) => {
    console.log(`加载进度: ${(progress * 100).toFixed(2)}%`);
}).then((bundle) => {
    if (bundle) {
        console.log('分包加载成功！');
    }
});
```

### 4. 资源管理
```typescript
// 加载资源
app.res.loadRes<Prefab>('SubGame_001/Game', 
    (completedCount, totalCount) => {
        console.log(`加载进度: ${(completedCount / totalCount * 100).toFixed(2)}%`);
    },
    (err, asset) => {
        if (!err) {
            // 使用加载的资源
        }
    }
);
```

### 5. 音频管理
```typescript
// 播放背景音乐
app.audio.playMusic('SubGame_001/Res/Audio/BGM');
// 播放音效
app.audio.playEffect('SubGame_001/Res/Audio/Click');
```

### 6. 事件管理
```typescript
// 订阅事件
app.event.on('测试事件', (res) => {
    console.log(res);
    console.log(res.userId);
    console.log(res.userName);
});

// 发布事件
app.event.emit('测试事件', { userId: 123, userName: 'John Doe' });
```

### 7. 时间管理
```typescript
let count = 1;
const task = () => {
    console.log('任务计次', count++);
};

// 添加定时任务
app.time.addTimer(task, 1000, true);
```

### 8. 多语言管理
```typescript
// 加载语言包
await app.lang.loadLanguageData('SubGame_001');
```

### 9. UI管理
```typescript
// 加载预制体
const prefab = await app.res.loadRes<Prefab>('SubGame_001/Game');
// 实例化预制体
const newNode = instantiate(prefab);
// 添加到场景
this.node.addChild(newNode);
```

## 注意事项
- 确保使用正确的Cocos Creator版本（3.8.4）
- 项目使用TypeScript开发，需要配置相应的开发环境
- 注意资源分包的管理和使用

## 贡献指南
1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 许可证
[待补充]