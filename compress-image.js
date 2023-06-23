// import f from "node-fetch"
// 'use strict';

const compress_images = require("compress-images");
// import { compress_images } from "compress-images/index"

function Compress(folder = "") {
    compress_images(
        `public/${folder}/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}`,
        `build/${folder}/`,
        { compress_force: false, statistic: true, autoupdate: true },
        false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        {
            gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
        },
        function (err, completed) {
            console.log(err)
            if (completed === true) {
                // Doing something.
                console.log("completed", completed)
            }
        }
    );
}

Compress("img")