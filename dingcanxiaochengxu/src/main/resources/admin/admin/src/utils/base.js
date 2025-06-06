const base = {
    get() {
        return {
            url : "http://localhost:8080/dingcanxiaochengxu/",
            name: "dingcanxiaochengxu",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/dingcanxiaochengxu/front/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "订餐小程序"
        } 
    }
}
export default base
