inlets = 2; // .. second inlet could provide custom path
outlets = 3;

function list() {

    const idx = arguments[4]

    let yaw_range = arguments[0];
    let yaw_resolution = arguments[1]
    let pitch_range = arguments[2]
    let pitch_resolution = arguments[3];

    // avoid zeros for loop
    if (yaw_resolution === 0) {yaw_resolution = 1}
    if (pitch_resolution === 0) {pitch_resolution = 1}

    // clear current file container
    outlet(2, 'clear');

    // create and fill new file container
    let pos_x = 100.0;
    let pos_y = 40.0;

    for (i = -yaw_range; i <= yaw_range; i += yaw_resolution) {
        console.log(i)
        for (j = -pitch_range; j <= pitch_range; j += pitch_resolution) {
            const array_left = 'r' + idx + '-left-array-' + i + '-' + j;
            const array_right = 'r' + idx + '-right-array-' + i + '-' + j;

            const spawn_left = ['obj', pos_x, pos_y, 'array', 'define', array_left];
            const spawn_right = ['obj', pos_x, pos_y + 22.0, 'array', 'define', array_right];

            outlet(2, spawn_left);
            outlet(2, spawn_right);
            
            // .. pass custom path here
            const path_left = '../resources/convolved/convolved_R' + idx + '_' + i + 'azim_' + j + 'elev_left.wav';
            const path_right = '../resources/convolved/convolved_R' + idx + '_' + i + 'azim_' + j + 'elev_right.wav';
            const read_left = ['read', '-resize', path_left, array_left];
            const read_right = ['read', '-resize', path_right, array_right];

            outlet(1, read_left);
            outlet(1, read_right);
            pos_y += 60.0;
        }
        pos_y = 40.0;
        pos_x += 280.0;
    }

    // update status
    outlet(0, ['symbol', '..done!']);
}