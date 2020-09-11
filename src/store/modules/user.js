const user={
    namespaced:true,
    state:{
        classArr:[],
        preference:{
            content:[],
            map:{
                address:'',
                city:'',
                district:'',
                latitude:'',
                longitude:'',
                name:'',
                province:''
            }
        }
    },
    mutations:{
        SET_CLASSARR(state,data){
            console.log('执行了user')
            state.classArr=data
        },
        SET_PREFERENCE(state,data){
            if(data){
                console.log(data)
                state.preference=data
            }
        },
        SET_MAP(state,data){
            state.preference.map={
                address:data.address,
                city:data.city,
                district:data.district,
                latitude:data.latitude,
                longitude:data.longitude,
                name:data.name,
                province:data.province
            }
        },



        ADD_PREFERENCE_CONTENT(state,data){
            state.preference.content.push(data)
        },
        REMOVE_PREFERENCE_CONTENT(state,data){
            const arr=state.preference.content.filter(item=>{
                if(item.key === data.key){
                    return false
                }
                return true
            })
            state.preference.content=arr
        }
    }
}
export default user