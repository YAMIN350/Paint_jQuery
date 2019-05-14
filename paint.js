window.onload = function(){
    context = document.getElementsByTagName('canvas')[0].getContext('2d');
    canvas = document.getElementsByTagName('canvas')[0];
    click = false;
    let tools = "";
    let position = [];
    let xa = 0;
    let ya = 0;

    $('#choose_canvas').click(function () {

        let line_y = $('#line_y').val();
        let line_x = $('#line_x').val();
        var sizeCanvas = document.getElementsByTagName('canvas')[0];
        if ($('#line_y').val() <= 900 && $('#line_x').val() <= 1400 && $('#line_y').val() > 0 && $('#line_x').val() > 0) {
            sizeCanvas.width = line_x;
            sizeCanvas.height = line_y;
        } else {
            alert("Vos dimensions ne doivent pas excéder 1400 px en largeur et 900 px en hauteur !")
        }
    });

    $("#gomme").click(function () {
        tools = "eraser";
    });

    $("#pen").click(function () {
        tools = "pen";
    });

    $("#line").click(function() {
        tools = "line";
    });

    $("#rectangle").click(function() {
        tools = "rectangle";
    });

    $("#rectangleFilled").click(function() {
        tools = "rectangleFilled";
    });

    $("#circle").click(function() {
        tools = "circle";
    });

    $("#circleFilled").click(function() {
        tools = "circleFilled";
    });

    $("#triangle").click(function() {
        tools = "triangle";
    });

    $("#smyle").click(function() {
        tools = "smyle";
    });

    $('#carre').click(function() {
        tools = "carre";
    });

    $('#eraser').click(function() {
        voidBackground();
    });

    $('#background').click(function () {
        background();
    });

    $('#text').click(function() {
        tools = "text";
    });

    function checkTools(e, status) {
        if (tools === "pen") {
            draw(e.pageX, e.pageY, status);
        } else if (tools === "eraser") {
            eraser(e.pageX, e.pageY);
        } else if (tools === "line") {
            line(e.pageX, e.pageY, status);
        } else if(tools === "rectangle") {
            rectangle(e.pageX, e.pageY, status);
        } else if (tools === "rectangleFilled") {
            rectangleFilled(e.pageX, e.pageY, status);
        } else if(tools === "circle") {
            circle(e.pageX, e.pageY, status);
        } else if(tools === "circleFilled") {
            circleFilled(e.pageX, e.pageY, status)
        } else if(tools === "smyle") {
            smyle(e.pageX, e.pageY);
        } else if (tools === "carre") {
            carre(e.pageX, e.pageY, status);
        } else if (tools === "text") {
            text();
        }
    }

    $(window).mousedown(function(){
        click = true;
    });

    $(window).mouseup(function(){
        click = false;
    });

    $('canvas').mousedown(function(e) {
        checkTools(e, 'mousedown');
    });

    $('canvas').mouseup(function(e) {
        checkTools(e, 'mouseup');
    });

    $('canvas').mousemove(function(e) {
        if (click === true) {
            checkTools(e, 'mousemove');
        }
    });

    function text() {
        var can = new fabric.Canvas('canvas');
        var itext = new fabric.IText('ecrit un text :)', {
            left: 100,
            top: 150,
            fill: '#D81B60',
            strokeWidth: 2,
            stroke: "#880E4F",
        });
        can.add(itext);
    }

    function draw(xPos, yPos, status) {
        if (status === 'mousedown') {
            context.beginPath();
            context.lineWidth = $('input[type=range]').val();
            context.strokeStyle = $('input[type=color]').val();
            context.moveTo(xPos - $('canvas').offset().left, yPos - $('canvas').offset().top);
        }
        else if (status === 'mousemove') {
            context.lineTo(xPos - $('canvas').offset().left, yPos - $('canvas').offset().top);
            context.stroke();
        }
    }

    function eraser(xPos, yPos) {
        context.clearRect(xPos - $('canvas').offset().left, yPos - $('canvas').offset().top, $('input[type=range]').val(), $('input[type=range]').val());
    }

    function line(xPos, yPos, status) {
        if (status === 'mousedown') {
            context.beginPath();
            context.lineWidth = $('input[type=range]').val();
            context.strokeStyle = $('input[type=color]').val();
            context.moveTo(xPos - $('canvas').offset().left, yPos - $('canvas').offset().top);
        } else if (status === 'mouseup') {
            context.lineTo(xPos - $('canvas').offset().left, yPos - $('canvas').offset().top);
            context.stroke();
        }
    }

    function rectangle(xPos, yPos, status) {
        context.beginPath();
        context.lineWidth = $('input[type=range]').val();
        context.strokeStyle = $('input[type=color]').val();
        if (status === 'mousedown'){
            position = [xPos - $('canvas').offset().left, yPos - $('canvas').offset().top];
        } else if (status === 'mouseup') {
            xPos = xPos - $('canvas').offset().left;
            yPos = yPos - $('canvas').offset().top;
            context.rect(position[0], position[1], xPos - position[0],  yPos - position[1]);
            context.stroke();
        }
    }

    function rectangleFilled(xPos, yPos, status) {
        context.beginPath();
        context.fillStyle = $('input[type=color]').val();
        if (status === 'mousedown'){
            position = [xPos - $('canvas').offset().left, yPos - $('canvas').offset().top];
        } else if (status === 'mouseup') {
            xPos = xPos - $('canvas').offset().left;
            yPos = yPos - $('canvas').offset().top;
            context.rect(position[0], position[1], xPos - position[0],  yPos - position[1]);
            context.fill();
        }
    }

    function circle(xPos, yPos, status) {
        context.beginPath();
        context.lineWidth = $('input[type=range]').val();
        context.strokeStyle = $('input[type=color]').val();
        if (status === 'mousedown') {
            position = [xPos - $('canvas').offset().left, yPos - $('canvas').offset().top];
            xa = position[0];
            ya = position[1];
        } else if (status === 'mouseup') {
            xb = xPos - $('canvas').offset().left;
            yb = yPos - $('canvas').offset().top;
            context.arc(position[0], position[1], Math.sqrt(Math.pow((xb - xa) , 2) + Math.pow((yb - ya), 2)), 0, 2 * Math.PI);
        }
        context.stroke();
    }

    function circleFilled(xPos, yPos, status) {
        context.beginPath();
        context.lineWidth = $('input[type=range]').val();
        context.fillStyle = $('input[type=color]').val();
        if (status === 'mousedown') {
            position = [xPos - $('canvas').offset().left, yPos - $('canvas').offset().top];
            xa = position[0];
            ya = position[1];
        } else if (status === 'mouseup') {
            xb = xPos - $('canvas').offset().left;
            yb = yPos - $('canvas').offset().top;
            context.arc(position[0], position[1], Math.sqrt(Math.pow((xb - xa) , 2) + Math.pow((yb - ya), 2)), 0, 2 * Math.PI);
        }
        context.fill();
    }

    function smyle(xPos, yPos) {
        var x = xPos - $('canvas').offset().left;
        var y = yPos - $('canvas').offset().top;
        context.beginPath();
        context.lineWidth = $('input[type=range]').val();
        context.strokeStyle = $('input[type=color]').val();
        context.arc(xPos - $('canvas').offset().left, yPos - $('canvas').offset().top, 50, 0, Math.PI * 2, true);  // Cercle extérieur
        context.moveTo(x,y);
        context.arc(x, y, 35, 0, Math.PI, false);  // Bouche (sens horaire)
        context.moveTo(x - 10, y - 10);
        context.arc(x -10, y - 10, 5, 0, Math.PI * 2, true);  // Oeil gauche
        context.moveTo(x + 15, y - 10);
        context.arc(x + 15, y - 10, 5, 0, Math.PI * 2, true);  // Oeil droite
        context.stroke();
    }

    function carre(xPos, yPos, status) {
        context.beginPath();
        context.strokeStyle = $('input[type=color]').val();
        if (status === 'mousedown'){
            position = [xPos - $('canvas').offset().left, yPos - $('canvas').offset().top];
        } else if (status === 'mouseup') {
            xPos = xPos - $('canvas').offset().left;
            context.fillRect(position[0], position[1], xPos - position[0],  xPos - position[0]);
            context.stroke();
        }
    }

    function voidBackground() {
        context.beginPath();
        context.fillStyle = "white";
        context.rect(0, 0, 5000,  500);
        context.fill();
    }

    function background() {
        context.beginPath();
        context.fillStyle = $('input[type=color]').val();
        context.rect(0, 0, 5000,  5000);
        context.fill();
    }

    $('#save').click(function() {
        var canvasSave = document.getElementById('canvas');
        if (confirm("Voulez vous enregistrer votre dessin au format .PNG ?")) {
            var downloadImage = canvasSave.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
            window.location.href=downloadImage;
        } else if (confirm("Voulez vous enregistrer votre dessin au format .JPEG?")) {
            var downloadImage = canvasSave.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
            window.location.href=downloadImage;
        }
    });


    document.getElementById('inp').onchange = function(e) {
        var img = new Image();
        img.onload = importImage;
        img.onerror = failed;
        img.src = URL.createObjectURL(this.files[0]);
    };

    function importImage() {
        canvas.width = this.width;
        canvas.height = this.height;
        context.drawImage(this, 0,0);
    }

    function failed() {
        console.error("The provided file couldn't be loaded as an Image media");
    }

};
function text() {
    var can = new fabric.Canvas('canvas');
    var itext = new fabric.IText('ecrit un text :)', {
        left: 100,
        top: 150,
        fill: '#D81B60',
        strokeWidth: 2,
        stroke: "#880E4F",
    });
    can.add(itext);
}
