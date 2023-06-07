const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")
canvas.width = 800;
canvas.height= 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

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

function onColorChange(event){
    ctx.strokeStyle = ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = ctx.fillStyle = color.value = colorValue;

}

function onModeClick() {
    if(isFilling){
        isFilling = false
        modeBtn.innerText = "Fill"
    } else { 
        isFilling= true
        modeBtn.innerText = "Draw"
    }
}

function onCanvasClick() { 
    if(isFilling) {
        ctx.fillRect(0,0,800,800);
    }
}


canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown",startPainting);
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("mouseleave",cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click",onColorClick));
//colorOptions.forEach(function(color) {
//color.addEventListener("click", onColorClick);
//}); 
//원래 이거를 arrow function으로 쓴거임

modeBtn.addEventListener("click",onModeClick);