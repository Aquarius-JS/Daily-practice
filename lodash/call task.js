async function cb() {
    await new Promise((res) => {
        setTimeout(() => {
            res(1)
        }, 3000)
    })
    console.log(1)
    await cb()
    // return 2
}
const res = await cb()
console.log(res, "!!!")

async function f(num) {
    if (num <= 1) {
        return 1;
    }
    return f(num - 1) + f(num - 2)
}

f(6).then(console.log)