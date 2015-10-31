function renderDrawingArea(img) {
    var totalMismatch = [100];

    // Look ma, no jQuery!
    //Clearing html make sure that there is no interferences
    document.getElementsByClassName('literally')[0].innerHTML = "";
    var lc = LC.init(
        document.getElementsByClassName('literally')[0],
        {imageURLPrefix: './img'}
    );
    var context = lc.ctx;
    var myImage = new Image();
    myImage.src = img;

    lc.setImageSize(myImage.naturalWidth, myImage.naturalHeight);
    function drawImage() {
        context.globalAlpha = 0.5;
        context.drawImage(myImage, 0, 0);
        context.globalAlpha = 1.0;
    }

    function updateMatch() {
        var diff = resemble(lc.getImage().toDataURL())
            .compareTo(myImage.src)
            .onComplete(function(data){
                totalMismatch.push(data.misMatchPercentage);
                document.getElementById("mismatch").innerHTML =
                    data.misMatchPercentage + "%";
         });
        diff.ignoreAntialiasing();
    }

    document.getElementById("check").onclick = updateMatch;
    document.getElementById("dl").onclick = function() {
        window.open(lc.getImage().toDataURL());
    };

    myImage.onload = drawImage;
    var unsubscribe = lc.on('drawingChange', drawImage);
    var unsubscribe = lc.on('shapeSave', drawImage);
    var unsubscribe = lc.on('clear', drawImage);
    var unsubscribe = lc.on('undo', drawImage);
    var unsubscribe = lc.on('redo', drawImage);
    var unsubscribe = lc.on('primaryColorChange', drawImage);
    var unsubscribe = lc.on('secondaryColorChange', drawImage);
    var unsubscribe = lc.on('backgroundColorChange', drawImage);
}

var photo1 = "./paintings/ross1.jpg";
var photo2 = "./paintings/ross2.jpg";
var photo3 = "./paintings/ross3.jpg";

renderDrawingArea(photo1)

document.getElementById("photo1").addEventListener('click', function() {
    renderDrawingArea(photo1);
})
document.getElementById("photo2").addEventListener('click', function() {
    renderDrawingArea(photo2);
})
document.getElementById("photo3").addEventListener('click', function() {
    renderDrawingArea(photo3);
})