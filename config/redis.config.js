import { REDIS_PASSWORD, REDIS_HOST, REDIS_PORT, REDIS_USER } from '../config/common.config.js';
import Redis from 'ioredis';

const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  username: REDIS_USER,
  password: REDIS_PASSWORD,
});

redis.on('error', (err) => console.error('Redis error:', err));

export default redis;
