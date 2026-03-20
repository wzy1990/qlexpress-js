<!--
 * @Author: 王志永
 * @Date: 2026-03-20 18:42:49
 * @LastEditors: 王志永
 * @LastEditTime: 2026-03-20 18:46:21
 * @Description: 
-->
# QLExpress React Example

这是一个基于 React + Monaco Editor 的 QLExpress 表达式引擎示例项目。

## 功能特性

- 🎨 使用 React 18 + TypeScript 构建
- 📝 集成 Monaco Editor 作为代码编辑器
- 🚀 支持 Vite 快速开发
- 💡 提供丰富的表达式示例
- 📊 实时执行统计
- 🎯 响应式设计

## 安装依赖

```bash
cd example
npm install
```

## 开发模式

```bash
npm run dev
```

项目将在 http://localhost:3000 启动

## 构建生产版本

```bash
npm run build
```

## 预览生产构建

```bash
npm run preview
```

## 项目结构

```
example/
├── src/
│   ├── App.tsx          # 主应用组件
│   ├── App.css          # 应用样式
│   ├── main.tsx         # 应用入口
│   └── index.css        # 全局样式
├── index.html           # HTML 模板
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript 配置
├── vite.config.ts       # Vite 配置
└── README.md            # 项目说明
```

## 技术栈

- React 18
- TypeScript
- Vite
- Monaco Editor
- react-monaco-editor

## 注意事项

当前示例使用模拟执行（通过 `eval`），实际使用时需要集成 QLExpress-JS 库：

```typescript
import { ExpressRunner } from 'qlexpress-js'

const runner = new ExpressRunner()
const result = runner.execute(expression, context)
```

## 快捷键

- `Ctrl/Cmd + Enter`: 执行表达式
- `Escape`: 清除结果
