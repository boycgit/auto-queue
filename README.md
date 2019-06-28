# ss-auto-queue

[![Build Status](https://travis-ci.org/boycgit/ss-auto-queue.svg?branch=master)](https://travis-ci.org/boycgit/ss-auto-queue) [![Coverage Status](https://coveralls.io/repos/github/boycgit/ss-auto-queue/badge.svg?branch=master)](https://coveralls.io/github/boycgit/ss-auto-queue?branch=master) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php) [![npm version](https://badge.fury.io/js/ss-auto-queue.svg)](https://badge.fury.io/js/ss-auto-queue)

Typescript Version of ss-auto-queue

该工具是为了解决入栈之后，自动隔一段时间出栈的需求：比如当用户第一次操作后，在其 20s 后需要进行自动保存操作；即我们只需要调用入栈（enqueue）的操作即可，出栈的时间不同我们关心；


实现原理比较简单，使用队列 + throttle 功能就搞定了;


## Installation

### Node.js / Browserify

```bash
npm install ss-auto-queue --save
```

```javascript
const AutoQueue = require('ss-auto-queue');

// 创建自动保存队列
const autoSaveQueue = new AutoQueue((config) => {
    const { type, value } = config!;
    if (type === QUEUE_OPERATION.EN) {
        // 当入队
    }
    // 出队的时候，执行任务
    if (type === QUEUE_OPERATION.DE) {
        // 当出队
    }
}, 100);

// 做了某操作之后，需要自动保存
autoSaveQueue.enqueue({from: 'user', action: 'click btn'})
```

### Global object

Include the pre-built script.

```html
<script src="./dist/index.umd.min.js"></script>

<script>
const AutoQueue = window.autoQueue;

// 创建自动保存队列
const autoSaveQueue = new AutoQueue((config) => {
    const { type, value } = config!;
    if (type === QUEUE_OPERATION.EN) {
        // 当入队
    }
    // 出队的时候，执行任务
    if (type === QUEUE_OPERATION.DE) {
        // 当出队
    }
}, 100);

// 做了某操作之后，需要自动保存
autoSaveQueue.enqueue({from: 'user', action: 'click btn'})

</script>
```

## Build & test

```bash
npm run build
```

```bash
npm test
```

## License

[MIT](LICENSE).
