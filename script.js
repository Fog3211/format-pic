document.getElementById('start').addEventListener('click', function () {
    getImg(function (image) {
        var can = imgToCanvas(image),
            imgshow = document.getElementById("imgShow");
        imgshow.setAttribute('src', canvasToImg(can));
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
    var array = ["image/webp", "image/jpg", "image/png"],
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
                // var imgSelect=document.getElementById("imgSelect");
                // imgSelect.setAttribute("src",);
                fn(image);
            }
        }
        imgFile.readAsDataURL(document.getElementById('inputImg').files[0]);
    } catch (e) {
        alert("请上传图片!");
    }
}