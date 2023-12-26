const expressapi = require("@borane/expressapi");
const { EventEmitter } = require("events");

const File = require("./models/File.js");

module.exports = class Discloud{
    #webhooks;

    constructor(webhooks){
        if(!webhooks instanceof Array)
            throw new Error("Webhooks must be an array.");

        if(webhooks.length == 0)
            throw new Error("Webhooks must have at least one element.");

        this.#webhooks = webhooks;
    }

    async postFile(content, chunkSize = 25165824){
        if(!content instanceof String)
            throw new Error("Content must be a string.");

        const parts = new Array();

        for(let i = 0; i < content.length; i += chunkSize) {
            parts.push(content.slice(i, i + chunkSize));
        }

        const chunks = new Array();
        const promises = new Array();

        for(let part of parts){
            promises.push(
                expressapi.RequestHelper.request({
                    url: `${this.#webhooks[promises.length]}?wait=true`,
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data; boundary=boundary"
                    },
                    body: `--boundary\r\nContent-Disposition: form-data; name="files[0]"; filename="chunk"\r\n\r\n${part}\r\n--boundary--`
                })
            );

            if(promises.length == this.#webhooks.length){
                chunks.push(...await Promise.all(promises));
                promises.length = 0;
            }
        }
        chunks.push(...await Promise.all(promises));

        return new File({
            chunks: chunks.map(c => c.attachments[0].url.split("?ex")[0]),
            checksum: expressapi.sha256(content),
            chunkSize: chunkSize
        });
    }

    async getFile(file){
        if(!file instanceof File)
            throw new Error("First argument must be a File.");

        const chunks = new Array();
        const promises = new Array();

        for(let url of file.chunks){
            promises.push(
                expressapi.RequestHelper.request({ url: url })
            );

            if(promises.length == this.#webhooks.length){
                chunks.push(...await Promise.all(promises));
                promises.length = 0;
            }
        }
        chunks.push(...await Promise.all(promises));

        return chunks.join("");
    }

    getFileSync(file){
        if(!file instanceof File)
            throw new Error("First argument must be a File.");
        
        const eventEmitter = new EventEmitter();

        setImmediate(async () => {
            for(let url of file.chunks){
                await new Promise(resolve => {
                    const stream = expressapi.RequestHelper.requestSync({ url: url })
                    stream.on("data", chunk => eventEmitter.emit("data", chunk));
                    stream.once("end", () => resolve());
                });
            }

            eventEmitter.emit("end");
        });

        return eventEmitter;
    }
};