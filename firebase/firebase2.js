import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js"
import { getCookie, setCookie } from 'https://cdn.jsdelivr.net/gh/treeder/web-components@0/js/cookies.js'

var app, auth, analytics, firebaseConfig
var sessionCookieName = 'session'
var sessionRefreshURL

export function firebaseInit(firebaseConfig2, opts = {}) {
    console.log("INITIALIZING FIREBASE", firebaseConfig2, opts)
    firebaseConfig = firebaseConfig2
    if (opts.sessionCookieName) sessionCookieName = opts.sessionCookieName
    if (opts.sessionRefreshURL) sessionRefreshURL = opts.sessionRefreshURL

    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    if (firebaseConfig.measurementId) {
        analytics = getAnalytics(app)
    }

    onAuthStateChanged(auth, async (user) => {
        if (!user) return
        // console.log("checking if cookie expired")
        // check if cookie expired, cookie max is 2 weeks. If it has, then refresh it
        let val = getCookie('session')
        if (!val) {
            // then do a cookie refresh
            if (sessionRefreshURL) {
                console.log("REFRESHING SESSION COOKIE")
                refreshSession(user)
                // TODO: HANDLE ERROR, PROBABLY SIGN USER OUT?
            }
        }
    })

}

export async function refreshSession(user) {
    const csrfToken = getCookie('csrfToken')
    let userID = user.uid
    let idToken = await user.getIdToken()
    let cookieR = await fetch(sessionRefreshURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ idToken: idToken, csrfToken: csrfToken })
    })
    let cookie = await cookieR.json()
    console.log("got cookie", cookie);
    console.log("updated user", userID)
    // setting cookie for widget

    // let uc = `userID=${userID}; SameSite=None; Secure; domain=${cookieDomain()}; path=/; max-age=${86400 * 90}`
    // document.cookie = uc
    setCookie('userID', userID, { maxAge: 86400 * 90 })
    // let sc = `${sessionCookieName}=${cookie['cookie']}; SameSite=None; Secure; domain=${cookieDomain()}; path=/; max-age=${cookie['expires']}`
    setCookie(sessionCookieName, cookie['cookie'], { maxAge: cookie['expires'] })
    // document.cookie = sc
}


export { app, auth, onAuthStateChanged, firebaseConfig }
