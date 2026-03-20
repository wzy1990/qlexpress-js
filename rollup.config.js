// rollup.config.js
const typescript = require('rollup-plugin-typescript2');
const { readFileSync } = require('fs');

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

module.exports = [
  // Node.js 版本 (CommonJS)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        clean: true
      })
    ]
  },
  
  // ES Module 版本
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        clean: true
      })
    ]
  },
  
  // 浏览器版本 (IIFE - 立即执行函数)
  {
    input: 'src/index.ts',
    output: {
      file: 'qlexpress-browser.js',
      format: 'iife',
      name: 'QLExpress',
      sourcemap: false,
      exports: 'named',
      banner: `/**
 * QLExpress-JS 浏览器版本 - 表达式引擎
 * 将表达式引擎打包为单文件以便在浏览器中使用
 * @version ${pkg.version}
 */`
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        clean: true
      })
    ]
  }
];
