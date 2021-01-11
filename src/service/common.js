import axios from "./axios";
import {Notification} from 'element-ui';

(function () {
    //设置缓存
    window.utils = {
        /* 获取storage */
        projectName: 'merchant_frontend',
        storage: {
            getter(key, type) {
                if (type == 1) {
                    return JSON.parse(
                        sessionStorage.getItem(`${utils.projectName}_${key}`),
                    );
                }
                return JSON.parse(
                    localStorage.getItem(`${utils.projectName}_${key}`),
                );
            },
            setter(key, val, type) {
                val = JSON.stringify(val);
                if (type == 1) {
                    return sessionStorage.setItem(`${utils.projectName}_${key}`, val);
                }
                return localStorage.setItem(`${utils.projectName}_${key}`, val);
            },
            remove(key, type) {
                if (type == 1) {
                    return sessionStorage.removeItem(`${utils.projectName}_${key}`);
                }
                return localStorage.removeItem(`${utils.projectName}_${key}`);
            },
        },
    };

}());

// 时间快捷方式
export const pickerOptions = {
    shortcuts: [{
        text: '最近一周',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近一个月',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近三个月',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
        }
    }]
}
//判断是否是中文
export function isChinese(str) {
    let reg = /^[\u4E00-\u9FA5]+$/;
    return reg.test(str)
}

//判断是否是手机
export function isPhone(phone) {
    return /^1(3\d|4\d|5\d|6\d|7\d|8\d|9\d)\d{8}$/g.test(phone);
}

//判断是否是正常字符串
export function isName(str) {
    let flag = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
    return flag.test(str)

}

//判断是否身份证
export function isCard(id) {
    if (id.length == 15) {
        return true
    }
    let format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
    return format.test(id)
}

//除去特殊字符
export function filterText(text) {
    text = text.replace(/[&\|\\\*^%$#@,\-]/g, "");
    return text;
};

export function isPwd(pwd) {
    let format = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,10})$/
    return format.test(pwd)
}

// *加密名字
export function noPassByName(str) {
    if (null != str && str != undefined) {
        if (str.length <= 3) {
            return "*" + str.substring(1, str.length);
        } else if (str.length > 3 && str.length <= 6) {
            return "**" + str.substring(2, str.length);
        } else if (str.length > 6) {
            return str.substring(0, 2) + "****" + str.substring(6, str.length)
        }
    } else {
        return "";
    }
}

//上传文件
export function uploadImg(file) {
    return new Promise((resolve) => {
        if (
            !(
                file.type == "image/jpeg" ||
                file.type == "image/png" ||
                file.type == "image/jpg" ||
                file.type == "image/gif"
            )
        ) {
            Notification({
                title: "上传图片只能是 jpg, png, jpeg 格式!",
                type: 'error'
            });
            reject();
            return false;
        }
        if (file.size > 5 * 1024 * 1024) {
            Notification({
                title: "图片大小请勿超过5M",
                type: 'error'
            });
            reject();
            return false;
        }
        const reader = new FileReader();
        const image = new Image();
        image.onload = (imageEvent) => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            const width = 750;
            const height = (750 / image.width) * image.height;
            canvas.width = width;
            canvas.height = height;
            context.clearRect(0, 0, width, height);
            context.drawImage(image, 0, 0, width, height);
            const dataUrl = canvas.toDataURL(file.type);
            const blobData = dataURItoFile(dataUrl, file.name);
            resolve(blobData);
        };
        reader.onload = (e) => {
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    })

        .then((file) => {
            let data = new FormData();
            data.append("image", file, file.name);
            data.append("img_type", 6);
            data.append("suffix", "jpg");
            let config = {
                headers: {"Content-Type": "multipart/form-data"},
            };
            return axios.post("store/upload/uploadFile", data, config);
        })
}

function dataURItoFile(dataurl, filename) {
    let arr = dataurl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}

//获取上传时需要的图片半路径
export function getImgUrl(str) {
    if (!str) {
        return ''
    }
    let url = str.split('com/')[1];
    return url
}