import request from '../../utils/request'
//获取商品列表
export function getGoods(data, size, limit) {
    return request({
        url: `/goods/list/search/${limit}/${size}`,
        method: 'post',
        data
    })
}
//删除接口
export function removeGoods(id) {
    return request({
        url: `/goods/${id}`,
        method: 'DELETE',
    })
}
//修改接口
export function editGoods(id) {
    return request({
        url: `/goods/${id}`,
        method: 'GET',
    })
}
//确实修改接口
export function AddeditGoods(data, id) {
    return request({
        url: `/goods/${id}`,
        method: 'PUT',
        data: {
            code: data.code,
            id: data.id,
            name: data.name,
            purchasePrice: data.purchasePrice,
            retailPrice: data.retailPrice,
            spec: data.spec,
            storageNum: data.storageNum,
            supplierID: data.supplierID,
            supplierName: data.supplierName
        }
    })
}
//搜索接口
export function searchGoods(data) {
    return request({
        url: `/goods/list/search/1/10`,
        method: 'POST',
        data: {
            data
        }
    })
}