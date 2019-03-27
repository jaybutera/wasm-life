export const CELL_SIZE = 80; // TODO: Move this to a config
export let pix2grid = x =>  Math.floor( (x-1) / (CELL_SIZE+1) );
export let grid2pix = x => (CELL_SIZE+1)*x + 1
