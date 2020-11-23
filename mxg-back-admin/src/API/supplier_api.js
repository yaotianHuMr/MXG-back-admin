// 引入request
import request from "../utils/request"

// 获取供应商列表
// export default {
//     getSupplier() {
//         return request({
//             url: '/supplier/list',
//             method: 'GET'
//         })
//     }
// }

// 供应商表格数据
export function info(size,page) {
    return request({
        url: `/supplier/list/search/${page}/${size}`,
        method: 'POST',
        data: {
            page,
            size
        }
    })
}
// 供应商删除
export function removeSupplier(id) {
    return request({
        url: `/supplier/${id}`,
        method: 'DELETE',
       
    })
}
// 增加供应商
export function addSupplier(from){
    return request({
        url:'/supplier',
        method:'POST',
        data:from
    })
}
// 修改供应商
export function updataSupplier(id,from){
    return requset ({
        url:`/supplier/${id}`,
        method:'PUT',
        data:from,
    })
}
// 查询供应商
export function searchSupplier(id){
    return request({
        url: `/supplier/${id}`,
        method:'GET'
    })
}