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