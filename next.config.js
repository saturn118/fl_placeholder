/** @type {import('next').NextConfig} */
// const nextTranslate = require("next-translate");

// module.exports = nextTranslate();
// module.exports = {
//   // https://github.com/vercel/next.js/issues/21079
//   // Remove this workaround whenever the issue is fixed
//   images: {
//     loader: "imgix",
//     path: "/"
//   },
//   assetPrefix: "./"
// };

// const nextTranslate = require("next-translate");
module.exports = {
  images: {
    domains: ["127.0.0.1"]
  }
}; //nextTranslate();
