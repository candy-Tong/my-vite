# 手写 Vite 项目
本文是手写 Vite 系列项目的仓库，采用 monorepo 进行管理
仓库的目录结构如下
```shell
└─packages
    └─ 1. my-vite-xxx
        ├─playground
    └─ 2. my-vite-xxx
        ├─playground
    └─ ……
```
+ 所有版本的手写 Vite 项目都放在 packages 中
+ 每个手写 Vite 项目中，会有一个 `playground` 文件夹用来存放调试用的前端页面项目


安装依赖
```shell
pnpm i
```

## 文章链接
+ `1.my-vite-simple-server`，《# 手把手教你写一个 Vite Server（一）》

如果对我的内容感兴趣，可以关注我的公众号，**【Candy 的修仙秘籍】**，主要讲 Vue 和 Vite 的技术和源码，欢迎关注~

![image-20220628214822060](https://img-1252756644.cos.ap-nanjing.myqcloud.com/img/68747470733a2f2f696d672d313235323735363634342e636f732e61702d6e616e6a696e672e6d7971636c6f75642e636f6d2f696d672f696d6167652d32303232303632383231343832323036302e706e67)
