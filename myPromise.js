const _PENDING_ = "pending";
const _FULFILLED_ = "fulfilled";
const _REJECTED_ = "rejected";

function MyPromise(execute) {
	this.state = _PENDING_;
	this.val = null;
	this.err = null;
	this.onFulfilledList = [];
	this.onRejectedList = [];
	this.resolve;
	const _resolve = val => {
		if ((this.state = _PENDING_)) {
			this.val = val;
			this.state = _FULFILLED_;
			this.onFulfilledList.forEach(cb => cb());
		}
	};
	const _reject = err => {
		if ((this.state = _PENDING_)) {
			this.err = err;
			this.state = _REJECTED_;
			this.onRejectedList.forEach(cb => cb());
		}
	};
	try {
		execute(_resolve, _reject);
	} catch (err) {
		_reject(err);
	}
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
	return new MyPromise((resolve, reject) => {
		if (this.state === _PENDING_) {
			this.onFulfilledList.push(() => {
				const result = onFulfilled(this.val) ?? null;
				resolve(result);
			});
			this.onRejectedList.push(() => {
				const result = onRejected ? onRejected(this.err) : this.err;
				reject(result);
			});
		} else if (this.state === _FULFILLED_) {
			resolve(onFulfilled(this.val));
		} else if (this.state === _REJECTED_ && onRejected) {
			//promise then rejeced得到的是一个 resolve 的promise
			resolve(onRejected(this.err));
		} else if (this.state === _REJECTED_ && !onRejected) {
			reject(this.err);
		}
	});
};

MyPromise.prototype.catch = function (onRejected) {
	return this.then(() => {}, onRejected(this.err));
};

MyPromise.resolve = (val)=>{
	
}

MyPromise.all = promises => {
	return new MyPromise((resolve, reject) => {
		const arr = [];
		const sum = 0;
		for (let i = 0; i < promises.length; i++) {
			MyPromise.resolve(promises[i])
				.then(val => {
					arr[i] = val;
					if (++sum === promises.length) {
						resolve(arr);
					}
				})
				.catch(err => {
					reject(err);
				});
		}
	});
};

MyPromise.race = promises => {
	return new MyPromise((resolve, reject) => {
		promises.forEach(promise => {
			MyPromise.resolve(promise)
				.then(val => {
					resolve(val);
				})
				.catch(err => {
					reject(err);
				});
		});
	});
};

const p = Promise.reject("2")
	.catch(er => {
		return er;
	})
	.then(val => {
		console.log(val);
	});

setTimeout(() => {
	console.log(p);
}, 1000);
