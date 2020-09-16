/**
 * 
 * @param { 需要分页的数组 } arr 
 * @param { 每页数量 } size 
 */

const pageApi = (arr, size) => {
  let result = []
  for (let i = 0, len = arr.length; i < len; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}


/**
 * 每日零点
 * */

const timeZero = time => {
  return new Date(time).setHours(0, 0, 0, 0) / 1000
}


export { pageApi, timeZero }