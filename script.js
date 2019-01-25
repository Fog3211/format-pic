var inputBox = document.getElementById('inputImg'); //上传文件节点
var imgshow = document.getElementById("imgShow"); //预览节点
var imgDownload = document.getElementById("download"); //下载按钮节点
var imgName = '',
    finish = false;

// 点击转换图片
document.getElementById('start').addEventListener('click', function () {
    getImg(function (image) {
        var can = imgToCanvas(image);
        imgshow.src = canvasToImg(can);
        imgShow.style.display = "block";
        imgDownload.style.cursor = "pointer";
        finish = true;
    });
});

// 把image 转换为 canvas对象  
function imgToCanvas(image) {
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d").drawImage(image, 0, 0);
    return canvas;
}

//canvas转换为image
function canvasToImg(canvas) {
    var array = ["image/webp", "image/jpeg", "image/png"],
        type = document.getElementById('typeSelect').value - 1;
    var src = canvas.toDataURL(array[type]);
    return src;
}

//获取图片信息
function getImg(fn) {
    var imgFile = new FileReader();
    try {
        imgFile.onload = function () {
            var image = new Image();
            image.src = this.result; //base64数据 
            image.onload = function () {
                fn(image);
            }
        }
        imgFile.readAsDataURL(inputBox.files[0]);
    } catch (e) {
        alert("请上传图片!");
    }
}

// 上传图片预览
inputBox.addEventListener("change", function () {
    var imgSelect = document.getElementById("imgSelect");
    var imgUp = document.getElementById("imgUp");
    var start = document.getElementById("start");
    imgName = inputBox.files[0].name;
    var reader = new FileReader();
    reader.readAsDataURL(inputBox.files[0]);
    reader.onload = function () {
        //读取完成后，将结果赋值给img的src
        imgUp.style.display = "block";
        imgSelect.src = this.result;
        start.style.cursor = "pointer";
    }
});

// 图片下载
document.getElementById("download").addEventListener("click", function () {
    if (finish) {
        imgDownload.href = imgshow.src;
        // imgDownload.download = imgshow.src;
        imgDownload.download = imgName.split(".")[0] + '.' + imgshow.src.split(";")[0].split("/")[1];
    } else {
        alert("请上传图片!");
    }
});