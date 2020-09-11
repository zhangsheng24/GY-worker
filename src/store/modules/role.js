const role={
    namespaced:true,
    state:{
        classArr1:[]
    },
    mutations:{
        SET_CLASSARR(state,data){
            console.log('执行了role')
            console.log(state,data)
        }
    }
}
export default role