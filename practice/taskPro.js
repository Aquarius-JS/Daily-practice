function taskPro() {
    this.next =async function() {
        return new Promise((res)=>{
            setTimeout(res,0)
        })
    }
    this.list = []
}

taskPro.prototype.add =  function(task) {
    this.list.push(task)
}

taskPro.prototype.run = function() {
    this.list.map(item=>item(this.next))
}

const tp = new taskPro()

tp.add(async(next)=>{
    console.log(1,"start")
    await next()
    console.log(1,'end')
})

tp.add((next)=>{
    console.log(2)
    next()
})

tp.add((next)=>{
    console.log(3)
    next()
})

tp.run()