import request from "@/utils/request"

export function getList(){
    return request({
        url:`member/list/search/${1}/${20}`,
        method:'POST'
    })
}
   
  


