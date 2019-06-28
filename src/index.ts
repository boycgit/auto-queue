import Queue from 'ss-queue';
import { throttle } from 'ts-debounce-throttle';

export const DEFAULT_AUTOTIME = 20 * 1000; // 默认自动保存的时间, 单位毫秒
export const TYPE_ENQUEUE = 'enqueue';
export const TYPE_DEQUEUE = 'dequeue';
const EmptyQueue = new Queue();

export enum QUEUE_OPERATION {
    EN = 'enqueue',
    DE = 'dequeue'
}

export interface ICallbackParam<T> { type: QUEUE_OPERATION, value?: void | T, queue?: Queue<T> }
export type TCallback<T> = (config?: ICallbackParam<T>) => void;
const emptyFunction: TCallback<any> = function () { };


export default class AutoQueue<T> extends Queue<T> {
    callback: TCallback<T>;
    autorun: ()=> void;
    constructor(callback: TCallback<T> = emptyFunction, autoTime = DEFAULT_AUTOTIME) {
        super();
        this.callback = callback; // callback when enqueue or dequeue;

        // 每隔一定时间自动出栈，并执行绑定的回调函数
        this.autorun = throttle(
            () => {
                const val = this.dequeue();

                // 此时的 queue 仍旧还是旧的队列；
                this.callback({ type: QUEUE_OPERATION.DE, value: val, queue: this });

                // 执行完之后，清空队列
                this.queue = EmptyQueue.queue.clone() as any;
                return val;
            },
            autoTime,
            {
                leading: false
            }
        );
    }

    enqueue(val) {
        this.autorun();
        this.callback({ type: QUEUE_OPERATION.EN, queue: this, value: val });
        return super.enqueue(val); // 调用父类方法入队
    }
}
