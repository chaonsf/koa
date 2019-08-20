module.exports={
    isNullOrEmptyString(data, ...args) {
        for(let arg of args) {
            if (!data[arg] || data[arg] == "") {
                 throw new Error(arg + "参数传递有误")
            }
        }
    },
}