const URLHASH = {
    mock: 'rap2api.taobao.org/app/mock/163112', //mock接口
    dev: 'vrs.sooc.com',                        //开发接口
    test: 'ttvrs.sooc.com',                     //测试接口
    prev: 'ttvrs.soocedu.com',                  //预上线接口
    master: 'vresmp.soocedu.com'                //线上接口
};

export const api = 'http://'+URLHASH.mock;