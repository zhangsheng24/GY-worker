import cfg from '@/config'
const name=`gy-worker-${cfg.type}-`

function LgetItem(key){
    let value=localStorage.getItem(name+key)
    return JSON.parse(value)
}

function LsetItem(key,value){
    localStorage.setItem(name+key,JSON.stringify(value))
}

function LreItem(key){
    localStorage.removeItem(name+key)
}

export {
    LgetItem,
    LsetItem,
    LreItem
}