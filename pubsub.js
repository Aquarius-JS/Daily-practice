function pubsub() {
    this.PubSub = {};
    this.on = (id, cb) => {
      this.PubSub[id]
        ? this.PubSub[id].add(cb)
        : (this.PubSub[id] = new Set().add(cb));
    };
    this.emit = (id, ...args) => {
      this.PubSub[id]?.forEach((item) => {
        item(...args);
      });
    };
  }
  
  const bus = new pubsub();
  
  bus.on("test", () => {
    console.log(1);
  });
  bus.on("test", (a, b) => {
    console.log(2, a, b);
  });
  
  bus.emit("test", "3", "4");
  