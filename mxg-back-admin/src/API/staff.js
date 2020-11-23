import request from "../utils/request";

// 获取员工接口
export function staffinfo(page,pageSize){
    return request({
        url:`staff/list/search/${page}/${pageSize}`,
        method:"POST",
        data:{
            page,
            pageSize
        }
    })
}

// 添加员工接口
// export function staffAdd(form){
//     return request({
//         url:"/member",
//         method:"POST",
//         data:{
//             form,
//         }
//     })
// }

// // 修改员工接口
// export function staffEdit(form){
//     return request({
//         url:"/member/${form.id}",
//         method:"POST",
//         data:{
//             form
//         }
//     })
// }

// 删除会员接口
export function staffDel(data){
    return request({
        url:`staff/${data}`,
        method:"DELETE",
        data
    })
}

// // 查询单条数据接口
// export function staffSeaOne(form){
//     return request({
//         url:"/member/${form.id}",
//         method:"POST",
//         data:form
//     })
// }
