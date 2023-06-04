const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")
canvas.width = 800;
canvas.height= 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;

function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY); // 이게 있어야 한붓그리기 안됨..! 새로 찍은곳으로 움직이란 거니까!
}

function startPainting(){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}

canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown",startPainting);
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("mouseleave",cancelPainting);

lineWidth.addEventListener("change", onLineWidthChange);