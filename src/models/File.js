module.exports = class File{
    #chunks;
    #checksum;
    #chunkSize;

    constructor({ chunks, checksum, chunkSize }){
        this.#chunks = chunks;
        this.#checksum = checksum;
        this.#chunkSize = chunkSize;
    }

    get chunks(){
        return this.#chunks;
    }

    get checksum(){
        return this.#checksum;
    }

    get chunkSize(){
        return this.#chunkSize;
    }
}