# big-react
react学习-从0实现

## 1. 项目初始化
### 1.1 初始化项目
```js
npm i -g pnpm
pnpm init -y
```
### 1.2 创建pnpm-workspace.yaml文件
`作用: 定义了工作空间的根目录,并能够从工作空间包含/排除目录,默认情况下,工作空间包含所有的子目录`
```yaml
packages:
   # 包含所有子目录
  - 'packages/*'
   # 排除packages目录下的node_modules
  - '!packages/*/node_modules'

```
### 1.3 创建packages目录
### 1.4 定义开发规范
#### 1.4.1 安装eslint
```js
// -D 代表开发依赖 -w 代表安装到工作空间
pnpm i eslint -D -w
```
#### 1.4.2 初始化eslint
```js
pnpm eslint --init
```
#### 1.4.3 安装eslint插件
```js
pnpm i  @typescript-eslint/eslint-plugin -D -w
pnpm i prettier -D -w
```
#### 1.4.4 创建prettier配置文件
```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": true,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "none",
  "bracketSpacing": true
}
```
将prettier集成到eslint中
- eslint-config-prettier: 关闭所有可能与prettier冲突的规则
- eslint-plugin-prettier: 将prettier作为eslint规则运行,并且显示格式错误
```js
pnpm i eslint-config-prettier -D -w
pnpm i eslint-plugin-prettier -D -w
```
package.json
```json
  "scripts": {
    "lint": "eslint --ext .ts,.jsx,.tsx --fix --quiet ./packages"
  },
```
#### 1.4.5 commit规范检查,安装husky
```js
pnpm i husky -D -w
```
初始化husky
```js
pnpm husky install
```
将pnpm lint命令添加到git commit的钩子中
```js
pnpm husky add .husky/pre-commit "pnpm lint"
```
TODO: pnpm lint会对代码全量检查,当项目复杂后执行速度可能比较慢,可以考虑使用lint-staged,只检查提交的代码,而不是全量检查
### 1.4.6 commit规范检查,安装commitlint
```js
pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D -w
```
创建 `.commitlintrc.js`配置文件
```js
module.exports = {
	extends: ['@commitlint/config-conventional']
};
```
集成到husky中
```js
pnpm husky add .husky/commit-msg "npx --no-install commitlint --edit $HUSKY_GIT_PARAMS"
```
conventional规范集意义
```js
// 提交类型: 摘要信息
// feat: 新功能
```
常用`type`值
- `feat`: 新功能
- `fix`: 修复bug
- `chore`: 变更构建流程或辅助工具
- `perf`: 性能优化
- `refactor`: 重构(即不是新增功能,也不是修改bug的代码变动)
- `docs`: 文档变更
- `style`: 代码格式(不影响代码运行的变动)
- `perf`: 性能优化
- `test`: 测试
- `build`: 变更项目构建或外部依赖(例如: webpack, npm, rollup配置)
