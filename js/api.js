import { getCookie } from 'https://cdn.jsdelivr.net/gh/treeder/web-components@0/js/cookies.js'

/*
This is a wrapper around fetch that deals with auth tokens, cookies and marshalling and parsing JSON.

To use the token getter, you can do something like this which is using firebase auth:

```js
apiInit({apiURL: '${d.apiURL}', getToken: () => auth.currentUser.getIdToken()})
```
*/

var opts = {}

// options:
// * apiURL = '' // set an API prefix so you don't have to pass in the full URL each time
// * getToken = null // you can set this and the it MUST have a getToken() function that returns a promise. This will be passed in as a Bearer token.
export function apiInit(options = {}) {
    opts = options
}

// zapi calls the API with auth token if logged in
export default async function api(path, np = { method: 'GET', body: {}, formData: null, headers: {}, sessionCookie: '' }) {
    let headers = np.headers;
    if (!headers) {
        headers = {}
    }
    if (!headers['Content-Type']) {
        headers['Content-Type'] = 'application/json'
    }

    if (!headers['Authorization']) {
        // Cookie notes: cookies aren't passed in fetch by default: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        // So we're doing some different various things here: explicity -> getToken() function -> 'session' cookie
        let sessionCookie = np.sessionCookie
        if (sessionCookie && sessionCookie !== '') {
            headers['Authorization'] = `Cookie ${sessionCookie}`
        } else if (opts.getToken) {
            let token = await opts.getToken()
            headers['Authorization'] = "Bearer " + token
        } else {
            let c = getCookie('session') || getCookie('session')
            if (c) {
                headers['Authorization'] = `Cookie ${c}`
            }
        }
    }

    let apiURL = opts.apiURL || ''

    let data = {
        method: np.method,
        headers: headers
    };
    if (np.formData) {
        data.body = np.formData
        delete headers['Content-Type'] // see https://github.com/github/fetch/issues/505#issuecomment-293064470
    } else if (!(np.method === 'GET' || np.method === 'HEAD')) {
        data.body = JSON.stringify(np.body);
    }
    try {
        let response = await fetch(apiURL + path, data);
        if (!response.ok) {
            console.log("RESPONSE STATUS:", response.status)
            // console.log(response.headers.get('Content-Type'));
            let ct = response.headers.get('Content-Type')
            if (ct && ct.includes('application/json')) {
                let j = await response.json()
                console.log("JSON ERROR:", j)
                throw new ApiError(response.status, j.error.message)
            } else {
                throw new ApiError(response.status, await response.text())
            }
        }
        return await response.json();
    } catch (e) {
        // console.log("CAUGHT ERROR:", e)
        throw e
    }
}

class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }

    statusCode() {
        return this.status
    }

    toString() {
        return `${this.status} ${this.message}`;
    }
}

export { api, ApiError }
