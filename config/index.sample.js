const URLHASH = {
    mock: 'rap2api.taobao.org/app/mock/163112',     //mock接口
    dev: 'sccloud.sooc.com',                        //开发接口
    test: 'iepmp.fr.soocedu.com',                   //测试接口
    prev: 'ttiepmp.soocedu.com',                    //预上线接口
    master: 'iepmp.soocedu.com'                     //线上接口
};

export const api = 'http://'+URLHASH.dev;

export const siteTitle = 'EM创新创业实训云平台';