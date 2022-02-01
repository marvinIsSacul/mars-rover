const fs = require('fs')

const rover = {
    boundryX: null,
    boundryY: null,
    xPos: null,
    yPos: null,

    /**
     * Stores orientation as an angle of 90 degrees intervals
     */
    orientation: null,


    setInitialPosition(x, y, o) {
        this.xPos = x;
        this.yPos = y;
        this.orientation = this.mapDirectionToOrientation(o);
    },

    setBoundry(x, y) {
        this.boundryX = x;
        this.boundryY = y;
    },

    checkIfInitialDataHasBeenSet() {
        if (this.xPos === null) {
            throw new Error('Intial X position not set')
        }
        if (this.yPos === null) {
            throw new Error('Intial Y position not set')
        }
        if (this.orientation === null) {
            throw new Error('Intial Orientation position not set')
        }

        if (this.boundryX === null) {
            throw new Error('Boundy X position not set')
        }
        if (this.boundryY === null) {
            throw new Error('Boundry Y position not set')
        }
    },

    moveAccordingToCommand(command) {
        switch (command) {
            case 'R': this.orientation += 90; break;
            case 'L': this.orientation -= 90; break;
            case 'M':
                // if facing North
                if (this.orientation === 0) {
                    if (this.yPos + 1 >= this.boundryY) throw new Error('Y boundry limits')
                    this.yPos++;
                }
                // if facing East 
                else if (this.orientation === 90) {
                    if (this.xPos + 1 >= this.boundryX) throw new Error('X boundry limits')
                    this.xPos++;
                }
                // if facing South 
                else if (this.orientation === 180) {
                    if (this.yPos - 1 <= 0) throw new Error('Y boundry limits')
                    this.yPos--;
                }
                // if facing West 
                else if (this.orientation === 270) {
                    if (this.xPos - 1 <= 0) throw new Error('X boundry limits')
                    this.xPos--;
                }
                break;
            default:
                throw new Error(`Command ${command} not understood`)
        }
    },

    mapDirectionToOrientation(d) {
        switch (d) {
            case 'N': return 0;
            case 'E': return 90;
            case 'S': return 180;
            case 'W': return 270;
            default: throw new Error(`Direction ${d} not understood`)
        }
    },

    mapOrientationToDirection(o) {
        switch (o) {
            case 0: return 'N';
            case 90: return 'E';
            case 180: return 'S';
            case 270: return 'W';
            default: throw new Error(`Orientation ${o} not understood`)
        }
    },

    getCurrentPosition() {
        return `${this.xPos} ${this.yPos} ${this.mapOrientationToDirection(this.orientation)}`
    }
};

function readDirectionsFile(filename) {
    const fileData = fs.readFileSync(filename, 'utf8');
    const [boundryData, startingPositionData, commands] = fileData.split(/\r?\n/)
    const [boundryX, boundryY] = boundryData.split(' ')
    const [x, y, o] = startingPositionData.split(' ')

    return {
        boundry: {
            x: boundryX.trim(),
            y: boundryY.trim()
        },
        startingPosition: {
            x: x.trim(),
            y: y.trim(),
            o: o.trim(),
        },
        commands: commands.trim(),
    }
}

const { boundry, startingPosition, commands } = readDirectionsFile('./commands.txt')

rover.setBoundry(boundry.x, boundry.y)
rover.setInitialPosition(startingPosition.x, startingPosition.y, startingPosition.o)

for (const command of commands) {
    rover.moveAccordingToCommand(command)
}

console.log(rover.getCurrentPosition())