class TaskManager {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.current = 0;
    this.results = [];
    this.task = [];
    this.suc;
    this.end = new Promise(res => {
      this.suc = res;
    });
  }

  addTask(task) {
    this.task.push(task);
    this.doTask();
  }

  async doTask() {
    if (this.current < this.concurrency && this.task.length > 0) {
      this.current++;
      const result = await this.task.shift()();
      console.log(result);
      this.current--;
      this.results.push(result);
      this.doTask();
    } else if (this.task.length <= 0 && this.current <= 0) {
      this.suc();
    }
  }

  getResults() {
    return new Promise(async res => {
      await this.end;
    });
  }
}

const p1 = () => {
  return new Promise(res =>
    setTimeout(() => {
      res('p1');
    }, 3000)
  );
};

const p2 = () => {
  return new Promise((rej, _) =>
    setTimeout(() => {
      rej('p2');
    }, 1500)
  );
};

const p3 = () => {
  return new Promise(res => {
    setTimeout(() => {
      res('p3');
    }, 1000);
  });
};

const tm = new TaskManager(3);

tm.addTask(p1);
tm.addTask(p2);
tm.addTask(p3);
tm.addTask(p2);
tm.addTask(p1);

tm.getResults().then(res => console.log(res, '###'));
