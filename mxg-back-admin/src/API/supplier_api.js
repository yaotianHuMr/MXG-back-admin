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
export function info(size, page) {
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
export function addSupplier(from) {
    return request({
        url: '/supplier',
        method: 'POST',
        data: {
            linkman: from.linkman,
            mobile: from.mobile,
            name: from.name,
            remark: from.remark
        }
    })
}
// 修改供应商
export function updataSupplier(id) {
    return request({
        url: `/supplier/${id}`,
        method: 'GET',
    })
}
// 修改供应商
export function AddupdataSupplier(id,from) {
    return request({
        url: `/supplier/${id}`,
        method: 'PUT',
        data: {
            linkman: from.linkman,
            mobile: from.mobile,
            name: from.name,
            remark: from.remark
        },
    })
}
// 查询供应商
export function searchSupplier(id) {
    return request({
        url: `/supplier/${id}`,
        method: 'GET'
    })
}