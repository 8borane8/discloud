module.exports = class File{
    #chunks;
    #checksum;
    #chunkSize;

    constructor(chunks, checksum = null, chunkSize = 25165824){
        if(!chunks instanceof Array)
            throw new Error("Chunks must be an array.");

        if(chunks.length == 0)
            throw new Error("Chunks must have at least one element.");

        if(!(checksum == null || (checksum instanceof String && checksum.length == 128)))
            throw new Error("Checksum must be null or a sha256 hash.");

        this.#chunks = chunks;
        this.#checksum = checksum;
        this.#chunkSize = chunkSize;
    }

    get chunks(){
        return this.#chunks;
    };

    get checksum(){
        return this.#checksum;
    };

    get chunkSize(){
        return this.#chunkSize;
    };
};