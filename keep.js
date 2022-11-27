/*
* Keep Silk Open
* https://gitlab.com/DaGammla/keep-silk-open
*
* Released under the MIT license
* https://gitlab.com/DaGammla/keep-silk-open/-/blob/main/LICENSE
*
* 2022 by DaGammla
*/

(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const alwaysUse = typeof AlwaysUseSilk != "undefined" && !!AlwaysUseSilk

    if (userAgent.includes("silk") || alwaysUse){
        let source = document.currentScript.getAttribute("src")
        const lastDivider = source.lastIndexOf("/")
        source = source.slice(0, lastDivider + 1) + "media.mp3"

        const nowQuery = () => `?q=${Date.now()}`

        const audio = document.createElement("audio")
        audio.controls = false
        audio.src = source + nowQuery()
        audio.muted = true
        audio.autoplay = true
        audio.loop = true
        document.body.appendChild(audio)

        const listenEvents = ["keydown", "click"]

        const addAllListeners = (listener) => {
            listenEvents.forEach(ev => {
                document.addEventListener(ev, listener)
            });
        }

        const removeAllListeners = (listener) => {
            listenEvents.forEach(ev => {
                document.removeEventListener(ev, listener)
            });
        }

        const reload = () => {
            audio.src = source + nowQuery()
            audio.currentTime = 0
            audio.play()
        }

        const startMedia = () => {
            reload()
            audio.muted = false
            audio.loop = false
            audio.onended = reload
            removeAllListeners(startMedia)
        }

        addAllListeners(startMedia)
    }
})()