# EIP-712 签名工具

基于 React 的 Web 应用，支持通过连接钱包使用 [EIP-712](https://eips.ethereum.org/EIPS/eip-712) 标准对结构化数据进行签名。提供 JSON 编辑、多种签名方法切换与实时日志展示。

![EIP-712 签名工具截图](images/screenshot.png)

## 技术栈

- **前端**: React 18 + TypeScript
- **钱包连接**: Reown (AppKit) + wagmi + viem
- **UI**: Radix UI + Tailwind CSS
- **编辑器**: Monaco Editor (JSON)
- **代码规范**: ESLint + Prettier + Husky + lint-staged

## 功能

- **钱包连接**: Reown 连接按钮，支持 MetaMask、WalletConnect 等；展示当前账户与网络；断开连接
- **JSON 编辑**: Monaco 语法高亮与校验、格式化、全屏、导入/导出 JSON
- **签名方法**: Tab 切换 `eth_signTypedData` (v1)、`eth_signTypedData_v3`、`eth_signTypedData_v4`
- **示例模板**: 各方法预置示例（含 MultiSig BatchTransfer 等），一键填充
- **日志**: 签名过程与结果实时输出到日志面板

## 环境要求

- Node.js 18+
- pnpm 9+

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发
pnpm dev

# 构建
pnpm build

# 预览构建结果
pnpm preview
```

## 环境变量

在项目根目录创建 `.env` 并配置 Reown 项目 ID（[Reown Dashboard](https://dashboard.reown.com) 创建项目后获取）：

```env
VITE_REOWN_PROJECT_ID=your_project_id
```

未配置时使用占位 ID，仅适合本地开发。

## 脚本

| 命令                | 说明                 |
| ------------------- | -------------------- |
| `pnpm dev`          | 启动开发服务器       |
| `pnpm build`        | 类型检查并构建生产包 |
| `pnpm preview`      | 本地预览构建产物     |
| `pnpm lint`         | 运行 ESLint          |
| `pnpm lint:fix`     | ESLint 并自动修复    |
| `pnpm format`       | Prettier 格式化      |
| `pnpm format:check` | 检查 Prettier 格式   |

## 项目结构

```
src/
├── components/     # 页面与 UI 组件
├── config/        # wagmi / Reown 配置
├── data/          # EIP-712 示例模板
├── lib/           # 工具函数
├── types/         # 类型定义
├── App.tsx
├── main.tsx
└── index.css
```

## License

MIT
