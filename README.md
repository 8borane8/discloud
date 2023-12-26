<h1 align="center">Bienvenue sur Discoin !</h1>

<p align="center">
    <img src=".github/favicon.png" alt="favicon" width="120" height="120"/>
    <br>
    <em>
        Discoin est une bibliothèque NodeJS qui permet d'utiliser<br>
        discord comme un cloud gratuit et illimité.
    </em>
</p>

<p align="center">
    <img src="https://img.shields.io/github/issues-closed/8borane8/discloud.svg" alt="issues-closed" />
    &nbsp;
    <img src="https://img.shields.io/github/license/8borane8/discloud.svg" alt="license" />
    &nbsp;
    <img src="https://img.shields.io/github/stars/8borane8/discloud.svg" alt="stars" />
    &nbsp;
    <img src="https://img.shields.io/github/forks/8borane8/discloud.svg" alt="forks" />
</p>

<hr>

## Présentation

Discloud est une bibliothèque Node.js révolutionnaire conçue pour transformer Discord en une plateforme de cloud sans pareille. En intégrant des fonctionnalités de cloud directement dans Discord, Discloud offre une alternative novatrice aux solutions traditionnelles. Discloud se distingue en termes de performance, de légèreté et de facilité d'utilisation.

## Technologies

- **Language** : NodeJS
- **Librairie** : @borane/expressapi

## Utilisations

```js
const discloud = require("@borane/discloud");

const dc = discloud.Discloud([
    "https://discord.com/api/webhooks/*****/***"
]);

const file = new discloud.File({
    chunks: [
        "https://cdn.discordapp.com/attachments/*****/***/chunk",
        "https://cdn.discordapp.com/attachments/*****/***/chunk"
    ],
    checksum: "*****",
    chunkSize: 25165824
});

const stream = dc.getFileSync(file);

const chunks = new Array();
stream.on("data", chunk => chunks.push(chunk));
stream.once("end", () => console.log(chunks.join("").length / 1024 / 1024));
```

```js
const discloud = require("@borane/discloud");

const dc = discloud.Discloud([
    "https://discord.com/api/webhooks/*****/***"
]);

(async () => {
    const file = await dc.postFile("fileContent");
    console.log(await dc.getFile());
})();
```