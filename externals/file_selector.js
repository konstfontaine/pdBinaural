inlets = 1;
outlets = 2;

let filename_left;
let filename_right;

function list() {

    const idx = arguments[2];
    const yaw = arguments[0];
    const pitch = arguments[1];

    filename_left = 'r' + idx + '-left-array-' + yaw + '-' + pitch;
    filename_right = 'r' + idx + '-right-array-' + yaw + '-' + pitch;
}

function bang() {
    outlet(0, ['set', filename_left]);
    outlet(1, ['set', filename_right]);
}