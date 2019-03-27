import { Universe, Cell } from "wasm-game-of-life";
import * as utils from "./utils.js";
// WASM memory
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";

const GRID_COLOR = "#FFFFFF";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#c9c9c9";

// Initialize life universe in wasm
const grid_width = utils.pix2grid(window.innerWidth);
const grid_height = utils.pix2grid(window.innerHeight);
const u = Universe.new(grid_width, grid_height);
console.log('Grid is ' + grid_width + 'x' + grid_height);

// Create a canvas
const canvas      = document.getElementById("game-of-life-canvas");
canvas.width  = utils.grid2pix(grid_width);
canvas.height = utils.grid2pix(grid_height);
const ctx = canvas.getContext('2d');

var starttime = 0;
const renderLoop = (ts) => {
    if (ts - starttime > 1000) {
       u.tick();
       drawCells();
       starttime = ts;
    }

    requestAnimationFrame(renderLoop);
}

const getIndex = (row, col) => {
    return row * grid_width + col;
};

const drawCells = () => {
    const cellsPtr = u.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, grid_width * grid_height);

    ctx.beginPath();

    for (let row = 0; row < grid_height; row++) {
        for (let col = 0; col < grid_width; col++) {
           const idx = getIndex(row, col);

           ctx.fillStyle = cells[idx] === Cell.Dead
              ? DEAD_COLOR
              : ALIVE_COLOR;

           ctx.fillRect(
              utils.grid2pix(col),
              utils.grid2pix(row),
              utils.CELL_SIZE,
              utils.CELL_SIZE
           );
        }
    }

  ctx.stroke();
};

// TODO: Handle out of bounds index case
// Click on canvas to flip a cell
canvas.addEventListener('mousemove', e => {
    //console.log(utils.pix2grid(e.pageX) + ',' + utils.pix2grid(e.pageY));
    u.flip_cell(
        utils.pix2grid(e.pageY),
        utils.pix2grid(e.pageX)
    );
    drawCells();
}, false);

drawCells();
requestAnimationFrame(renderLoop);
