export default class Room {

    constructor(positionX, positionY, width, height, name) {
        const tileSize = 16
        this.positionX = positionX * tileSize;
        this.positionY = positionY * tileSize;
        this.width = width;
        this.height = height;
        this.name = name;
        this.roomLayout = Array(height * tileSize).fill().map(() => Array(width * tileSize));
    }


}