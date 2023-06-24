
//sessionStorage.getItem('eu_token')

export const Request = async (url, action,token, data = {}) => {
    const response = await fetch(`${url}/${action}`, {
        method:'post',
        //body:`action=${action}&token=${token}${queryStringData?'&'+queryStringData:''}`
        body:JSON.stringify({
            token,
            ...data
        })
    })
    return await response.json()
}