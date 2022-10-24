import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXlFdy1wbNIdqbnr5wB_QeWCz-Q_7HbcU",
  authDomain: "music-app-8184a.firebaseapp.com",
  projectId: "music-app-8184a",
  storageBucket: "music-app-8184a.appspot.com",
  messagingSenderId: "369456985869",
  appId: "1:369456985869:web:8d4d5db8e481d57abca244"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
