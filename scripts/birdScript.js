var canvas = document.getElementById("birdCanvas");
    var ctx = canvas.getContext("2d");
    var rectWidth = 50;
    var rectHeight = 50;
    var rectx = 20;
    var recty = canvas.height/2;
    var rectdx = 1;
    var rectdy = 1;
    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;
    var linex = 475;
    var lineCounter = 0;
    var segment1 = 50;
    var score = 0;

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if(e.key == "Up" || e.key == "ArrowUp") {
            upPressed = true;
        }
        else if(e.key == "Down" || e.key == "ArrowDown") {
            downPressed = true;
        }
    }

    function keyUpHandler(e) {
        if(e.key == "Up" || e.key == "ArrowUp") {
            upPressed = false;
        }
        else if(e.key == "Down" || e.key == "ArrowDown") {
            downPressed = false;
        }
    }

    function drawCanvas() {
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }


    function drawLine1() {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "black";

        //First Segment
        ctx.moveTo(linex, 0);
        ctx.lineTo(linex, segment1);
        //Second Segment
        ctx.moveTo(linex, segment1+100);
        ctx.lineTo(linex, 320);

        ctx.stroke();
    }


    function drawRect() {
        ctx.beginPath();
        ctx.rect(rectx, recty, rectWidth, rectHeight);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
    }

    function drawScore() {
        // Display score on screen
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: "+ score, 8, 20);
    }

    function gameOver() {
        alert('GAME OVER');
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawCanvas();
        drawRect();
        drawScore();
        
        if( rightPressed) {
            rectx += 3;
            if (rectx + rectWidth > canvas.width){
                rectx = canvas.width - rectWidth;
            }
        }
        else if (leftPressed) {
            rectx -= 3;
            if (rectx < 0){
                rectx = 0;
            }
        }
        else if (upPressed) {
            recty -= 3;
            if (recty < 0){
                recty = 0;
            }
        }
        else if (downPressed) {
            recty += 3;
            if (recty + rectHeight > canvas.height){
                recty = canvas.height - rectHeight;
            }
        }

        drawLine1();
        
        linex -= 1;
        lineCounter += 1;

        if (lineCounter === 480) {
            segment1 = Math.floor((Math.random() * 150) + 1);
            linex = 480;
            lineCounter = 0;
        }


        if(rectx + rectWidth === linex && recty < segment1) {
            gameOver();
        }
        if(rectx + rectWidth === linex && recty + rectHeight > segment1+100){
            gameOver();
        }
        if(rectx === linex && recty < segment1) {
            gameOver();
        }
        if(rectx === linex && recty + rectHeight > segment1+100){
            gameOver();
        }
        if(rectx === linex) {
            score++;
            if(score === 5) {
                alert('YOU WIN!');
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }
        }

    }

    setInterval(draw, 10);