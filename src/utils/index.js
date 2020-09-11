export function isIos() {
    return (/iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase()))
}