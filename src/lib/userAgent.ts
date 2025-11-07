const userAgent = navigator.userAgent

export function isIosBrowser() {
  return /iPad|iPhone|iPod/.test(userAgent)
}

export function isAndroidBrowser() {
  return /Android/.test(userAgent)
}

export function isIosChromeBrowser() {
  return isIosBrowser() && navigator.userAgent.includes("CriOS")
}

export function isMobileDevice() {
  return isIosBrowser() || isAndroidBrowser() || isIosChromeBrowser()
}

export function isSafariBrowser() {
  return /^((?!chrome|android).)*safari/i.test(userAgent)
}

export function isAndroidChromeBrowser() {
  return isAndroidBrowser() && userAgent.includes("Chrome")
}

export function isMacDevice() {
  return userAgent.includes("Mac OS X")
}

export function isWindowsDevice() {
  return userAgent.includes("Windows_NT")
}

export function isChromeDesktopBrowser() {
  return userAgent.includes("Chrome/") && !/Android|iPhone|iPad/i.test(userAgent)
}

export function isFirefoxBrowser() {
  return userAgent.includes("Firefox")
}
