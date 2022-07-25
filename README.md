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
+ `1.my-vite-simple-server`，[《# 手把手教你写一个 Vite Server（一）》](https://juejin.cn/post/7116504953828409351/)
+ `2.my-vite-middleware-plugins`，[《手把手教你手写 Vite Server（二）—— 插件架构设计](https://juejin.cn/post/7119849977240616996/)
+ `3. my-vite-transform-hook`，[手写 Vite Server 系列（3）—— 更细粒度的复用](https://juejin.cn/post/7124291335816740895/)

如果对我的内容感兴趣，可以关注我的公众号，[Candy 的修仙秘籍](https://img-1252756644.cos.ap-nanjing.myqcloud.com/img/OfficialAccounts.png)，主要讲 Vue 和 Vite 的技术和源码，欢迎关注~

![image](https://user-images.githubusercontent.com/20377280/177232920-924b1c9c-2203-445a-b5f6-107ffdf556d5.png)

