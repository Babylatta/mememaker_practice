const fillTextBtn = document.getElementById("fill-text-btn");
const strokeTextBtn = document.getElementById("stroke-text-btn");
const fontSelect = document.getElementById("font-select");
const textSizeInput = document.getElementById("font-size");
const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;


canvas.width = CANVAS_WIDTH;
canvas.height= CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

let selectedFont = fontSelect.value;


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
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

function onDestroyClick() {
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onEraserClick() {
    ctx.strokeStyle="white";
    isFilling = false;
    modeBtn.innerText="Fill";

}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file)
    const image = new Image();
    image.src=url;
    image.onload = function() {
        ctx.drawImage(image,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        fileInput.value=null;
    }
}

function onDoubleClick(event) {
    const text = textInput.value;
    const fontsize = textSizeInput.value;
    const selectedFont = fontSelect.value;
    if (text !== ""){    
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = `${fontsize}px ${selectedFont}`; //여기 이새끼부터 해야함
        if (fillTextBtn.classList.contains('active')) {
            ctx.fillText(text, event.offsetX, event.offsetY);
          } else if (strokeTextBtn.classList.contains('active')) {
            ctx.strokeText(text, event.offsetX, event.offsetY);
          }
        ctx.restore();
    }
}

function onFillTextClick() {
    fillTextBtn.classList.add('active');
    strokeTextBtn.classList.remove('active');
}

function onStrokeTextClick(){
    strokeTextBtn.classList.add('active');
    fillTextBtn.classList.remove('active') 
}


function onSaveclick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

function onFontChange() {
    selectedFont = fontSelect.value;
}

canvas.addEventListener("dblclick", onDoubleClick);
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
destroyBtn.addEventListener("click",onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change",onFileChange);
saveBtn.addEventListener("click", onSaveclick);
fontSelect.addEventListener("change", onFontChange);
fillTextBtn.addEventListener("click", onFillTextClick);
strokeTextBtn.addEventListener("click", onStrokeTextClick);

 