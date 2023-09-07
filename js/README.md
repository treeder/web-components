Some simple little JavaScript libs. 

## API 

```
import { api, apiInit } from 'https://cdn.jsdelivr.net/gh/treeder/web-components@0/js/api.js'
```

Initialize it (optional):

```
apiInit({apiURL: '${d.apiURL}', getToken: () => auth.currentUser.getIdToken()})
```

* `apiURL` will prefix if you just use paths
* `getToken` is a function that will return an auth token then use it in `Authorization` header

## Cookies

Example: 

```js
import { getCookie } from 'https://cdn.jsdelivr.net/gh/treeder/web-components@0/js/cookies.js'

let sessionToken = getCookie('session')
```
