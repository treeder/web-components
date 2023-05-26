Use firebase2.js, not firebase.js.

Initialize:

```js
import {firebaseInit, auth} from 'https://cdn.jsdelivr.net/gh/treeder/web-components@0/firebase/firebase2.js'
firebaseInit(firebaseConfig, {sessionRefreshURL: '${d.apiURL}/v1/session'})
```
