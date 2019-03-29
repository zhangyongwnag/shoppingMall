// 配置环境变量 type 为 test，区分测试环境
process.env.type = '"test"'
// 引入build.js文件，执行原先的编译代码
require('./build')
