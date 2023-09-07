Some simple little JavaScript libs. 

## API 

```
import { api, apiInit } from 'https://cdn.jsdelivr.net/gh/treeder/web-components@0/js/api.js'
```

Initialize it:

```
apiInit({apiURL: '${d.apiURL}', getToken: () => auth.currentUser.getIdToken()})
```

## Cookies

Example: 

```js
import { getCookie } from 'https://cdn.jsdelivr.net/gh/treeder/web-components@0/js/cookies.js'

let sessionToken = getCookie('session')
```
