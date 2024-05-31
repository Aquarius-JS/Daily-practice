const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    let line = await readline();
    let n = line[0] * 1;
    let q = line[2] * 1;
    line = await readline();
    let arr = line.split(" ");
    for (let _i = 0; _i < q; _i++) {
        line = await readline();
        let l = line[0] * 1 - 1;
        let r = line[2] * 1;
        let s = "";
        for (let i = l; i < r; i++) {
            s += arr[i];
        }
        let count = s
            .split("")
            .map((item) => item * 1)
            .reduce((sum, item) => sum + item, 0);
        if (count % 3 == 0) {
            console.log("YES");
        } else {
            console.log("NO");
        }
    }
})();
