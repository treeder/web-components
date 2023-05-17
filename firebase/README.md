Use firebase2.js, not firebase.js.

Initialize:

```js
import {firebaseInit, auth} from '/js/firebase.js'
firebaseInit(firebaseConfig, {sessionRefreshURL: '${d.apiURL}/v1/session'})
```
