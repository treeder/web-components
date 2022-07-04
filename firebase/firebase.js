import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js"
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js"

// MUST SET firebaseConfig global var in JavaScript
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
let analytics = null
if(firebaseConfig.measurementId){
  analytics = getAnalytics()
}

export { app, auth, onAuthStateChanged, analytics }
