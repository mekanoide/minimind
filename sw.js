if(!self.define){let n,s={};const e=(e,u)=>(e=new URL(e+".js",u).href,s[e]||new Promise((s=>{if("document"in self){const n=document.createElement("script");n.src=e,n.onload=s,document.head.appendChild(n)}else n=e,importScripts(e),s()})).then((()=>{let n=s[e];if(!n)throw new Error(`Module ${e} didn’t register its module`);return n})));self.define=(u,l)=>{const i=n||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const t=n=>e(n,i),o={module:{uri:i},exports:r,require:t};s[i]=Promise.all(u.map((n=>o[n]||t(n)))).then((n=>(l(...n),r)))}}define(["./workbox-bde5248a"],(function(n){"use strict";self.skipWaiting(),n.clientsClaim(),n.precacheAndRoute([{url:"_nuxt/_cVO8yGT.js",revision:null},{url:"_nuxt/9KMOJFj-.js",revision:null},{url:"_nuxt/auth.D5VLvZhe.css",revision:null},{url:"_nuxt/B_6ZJHoI.js",revision:null},{url:"_nuxt/B0TvKmci.js",revision:null},{url:"_nuxt/BDzreKsM.js",revision:null},{url:"_nuxt/BImCA5dO.js",revision:null},{url:"_nuxt/BQkc-AXV.js",revision:null},{url:"_nuxt/BWpJWdMG.js",revision:null},{url:"_nuxt/C-NtQsYO.js",revision:null},{url:"_nuxt/Ca2Beam8.js",revision:null},{url:"_nuxt/CATQWhcF.js",revision:null},{url:"_nuxt/CDr87EQ5.js",revision:null},{url:"_nuxt/CUc_FtVx.js",revision:null},{url:"_nuxt/D-xGm8BZ.js",revision:null},{url:"_nuxt/D0GVcFRy.js",revision:null},{url:"_nuxt/default.BJTPf2dX.css",revision:null},{url:"_nuxt/Dhm-Jxbl.js",revision:null},{url:"_nuxt/DUzH9xda.js",revision:null},{url:"_nuxt/entry.BA2xO3Y6.css",revision:null},{url:"_nuxt/error-404.Cs7Z0ZwI.css",revision:null},{url:"_nuxt/error-500.BY691cIp.css",revision:null},{url:"_nuxt/Icon.ZOBSkkxu.css",revision:null},{url:"_nuxt/IconCSS.CgrGMR01.css",revision:null},{url:"_nuxt/j5CdRouJ.js",revision:null},{url:"_nuxt/tasks.QgIsSwAz.css",revision:null},{url:"favicon.svg",revision:"bf2d1a24eb132deb22cfd4a56cfc19bd"},{url:"icon-192x192.png",revision:"295215d2d97a51341a06a5e57ad23826"},{url:"icon-512x512.png",revision:"fb13f9b1b887ff5be6c0247f1134be2e"},{url:"manifest.webmanifest",revision:"f1a57eecad11896a39684f9a4c821154"},{url:"_nuxt/builds/latest.json",revision:"087b51d259fcda4d3ff140870142a476"},{url:"_nuxt/builds/meta/72169c29-a52b-4008-ab0e-c08d8d5e3ec3.json",revision:null},{url:"manifest.webmanifest",revision:"f1a57eecad11896a39684f9a4c821154"}],{}),n.cleanupOutdatedCaches(),n.registerRoute(new n.NavigationRoute(n.createHandlerBoundToURL("/"))),n.registerRoute(/\.(?:png|gif|jpg|jpeg|svg|css|js|html)$/,new n.CacheFirst({cacheName:"assets-cache",plugins:[new n.ExpirationPlugin({maxEntries:50,maxAgeSeconds:2592e3})]}),"GET"),n.registerRoute("https://fonts.googleapis.com/.*",new n.CacheFirst,"GET"),n.registerRoute("https://fonts.gstatic.com/.*",new n.CacheFirst,"GET"),n.registerRoute(/\.(?:woff|woff2)$/,new n.CacheFirst({cacheName:"fonts-cache",plugins:[new n.ExpirationPlugin({maxEntries:20,maxAgeSeconds:31536e3})]}),"GET")}));