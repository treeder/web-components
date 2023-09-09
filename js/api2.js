/*
This is a wrapper around fetch that deals with auth tokens, cookies and marshalling and parsing JSON.

To use the token getter, you can do something like this which is using firebase auth:

```js
apiInit({apiURL: '${d.apiURL}', getToken: () => auth.currentUser.getIdToken()})
```
*/

var opts = {}
var apiURL = ''

// options:
// * apiURL = '' // set an API prefix so you don't have to pass in the full URL each time
// * getToken = null // you can set this and the it MUST have a getToken() function that returns a promise. This will be passed in as a Bearer token.
export function apiInit(options = {}) {
    opts = options
    apiURL = opts.apiURL || ''
}

export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// api calls the API with all the details. 
// url is either a full URL or a path that will be appended to the apiURL option
export default async function api(url, {
    method = "GET",
    body = {},
    formData = null,
    headers = {
        "Content-Type": "application/json"
    },
    sessionCookie = "",
} = {},) {

    method = method.toUpperCase()

    if (!headers['Authorization']) {
        // Cookie notes: cookies aren't passed in fetch by default: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        // So we're doing some different various things here: explicity -> getToken() function -> 'session' cookie
        if (sessionCookie && sessionCookie !== '') {
            headers['Authorization'] = `Cookie ${sessionCookie}`
        } else if (opts.getToken) {
            let token = await opts.getToken()
            headers['Authorization'] = "Bearer " + token
        } else {
            if (typeof window !== "undefined") {
                // running in browser
                let c = getCookie('session') || getCookie('session')
                if (c) {
                    headers['Authorization'] = `Cookie ${c}`
                }
            } else {
                // not running in browser
            }
        }
    }

    console.log("opts:", opts)
    let apiURL = opts.apiURL || ''
    let data = {
        method: method,
        headers: headers
    }
    url = url.startsWith('http') ? url : apiURL + url
    console.log("calling api:", url)
    if (formData) {
        data.body = formData
        delete headers['Content-Type'] // see https://github.com/github/fetch/issues/505#issuecomment-293064470
    } else if (!(method === 'GET' || method === 'HEAD')) {
        data.body = JSON.stringify(body)
    }
    try {
        let response = await fetch(url, data)
        if (!response.ok) {
            // console.log("RESPONSE STATUS:", response.status)
            // console.log(response.headers.get('Content-Type'));
            let ct = response.headers.get('Content-Type')
            if (ct && ct.includes('application/json')) {
                let j = await response.json()
                console.log("JSON ERROR:", j)
                throw new ApiError(j.error.message, { status: response.status })
            } else {
                throw new ApiError(await response.text(), { status: response.status })
            }
        }
        return await response.json()
    } catch (e) {
        // console.log("CAUGHT ERROR:", e)
        throw e
    }
}

class ApiError extends Error {
    constructor(message, options = {}) { // matches standard Error and Response
        super(message, options)
        this.options = options
    }

    get status() {
        return this.options.status
    }

    toString() {
        return `${super.toString()} ${this.options.status && this.options.status > 0 ? this.options.status : ''}`
    }
}

export { api, ApiError, apiURL }
