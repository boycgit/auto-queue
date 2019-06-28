import AutoQueue, {QUEUE_OPERATION} from "../src";


describe('模拟自动保存场景', ()=>{
    let autoSaveQueue;
    let outCount ;
    let inCount ;
    let dataArr;
    interface IQueuData {
        data: string
    }
    beforeEach(()=>{
        outCount = 0;
        inCount = 0;
        dataArr = [];
        autoSaveQueue = new AutoQueue<IQueuData>((config) => {
            const { type, value } = config!;
            if (type === QUEUE_OPERATION.EN) {
                ++inCount;
            }
            // 出队的时候，执行任务
            if (type === QUEUE_OPERATION.DE) {
                ++outCount;
                dataArr.push(value && value.data);
            }
        }, 100);
    });
    it('100ms 内多次触发自动保存', (done)=>{
        autoSaveQueue.enqueue({data: 'hello'});
        expect(inCount).toBe(1);
        expect(outCount).toBe(0);

        setTimeout(() => {
            autoSaveQueue.enqueue({ data: 'world' });
            expect(inCount).toBe(2);
            expect(outCount).toBe(0);

        }, 10);

        setTimeout(() => {
            autoSaveQueue.enqueue({ data: 'foo' });
            expect(inCount).toBe(3);
            expect(outCount).toBe(0);
        }, 50);

        setTimeout(() => {
            autoSaveQueue.enqueue({ data: 'bar' });
            expect(inCount).toBe(4);
            expect(outCount).toBe(0);
        }, 90);

        setTimeout(() => {
            expect(inCount).toBe(4);
            expect(outCount).toBe(1);
            expect(dataArr).toEqual(['hello']);
            done();
        }, 110);

    })
})