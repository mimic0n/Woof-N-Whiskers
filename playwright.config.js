import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir:'./tests', fullyParallel:false, workers:1, timeout:45000,
 use:{baseURL:process.env.WNW_TEST_URL||'http://localhost:8001',viewport:{width:1440,height:1000},reducedMotion:'reduce',launchOptions:{...(process.env.WNW_BROWSER_PATH?{executablePath:process.env.WNW_BROWSER_PATH}:{}),args:['--no-sandbox','--disable-dev-shm-usage']}},
 reporter:'list'
});
