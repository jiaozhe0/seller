/*
* 解析ulr参数
* @example ? id=1234&a=b
* @retrun Object {id:1234,a:b}
* */
export function urlParse() {
  let url = document.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('='); // 删掉？或者 & ，然后从= 开始分割
      obj[decodeURIComponent(tempArr[0])] = decodeURIComponent(tempArr[1]);
    });
  };
  console.log(obj);
  return obj;
}
