class TM {
  constructor(maxCount) {
    this.maxCount = maxCount;
    this.count = 0;
    this.queue = [];
  }

  async addTask(task) {
    if (this.count >= this.maxCount) {
      await this.taskEnd();
    }
    this.count++;
    const res = await task();
    this.queue.shift()?.();
    this.count--;
    return res;
  }

  async taskEnd() {
    return new Promise(res => {
      this.queue.push(res);
    });
  }
}

const p1 = () => new Promise(resolve => setTimeout(() => resolve('p1'), 3000));
const p2 = () => new Promise((_, reject) => setTimeout(() => reject('p2'), 1500));
const p3 = () => new Promise(resolve => setTimeout(() => resolve('p3'), 1000));

const taskManager = new TM(3);

taskManager.addTask(p1).then(() => console.log('end1'));
taskManager.addTask(p1).then(() => console.log('end2'));
taskManager.addTask(p3).then(() => console.log('end3'));
taskManager.addTask(p1).then(() => console.log('end4'));
taskManager.addTask(p2).catch(() => console.log('end5'));
