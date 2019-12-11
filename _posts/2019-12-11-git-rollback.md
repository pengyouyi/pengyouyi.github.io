---
layout: post
title: git回滚
tags:
- Command-Line
categories: Tool
description: git回滚
---


# one-查看版本

```shell
git log
```

commit 是版本号，
第一条是当前最新的版本号，
按向下的键可以查看之前的版本

然后按 q 先退出

# two-回滚到之前版本

```shell
git reset --hard 版本号
```

# three-回滚之后，再查看之前最新的版本号

```shell
git reflog
```

Fast-forward 是最新的版本号

# four-再次回滚到最新的版本

```shell
git reset --hard   版本号
```


# more

- [了解Git和Github](http://www.cnblogs.com/haiyan123/p/7989167.html)