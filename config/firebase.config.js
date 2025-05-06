import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeApp as initializeAdminApp, cert } from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_SERVICE_ACCOUNT
} from './common.config.js';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let adminApp;
let adminAuth;

try {
  if (FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(FIREBASE_SERVICE_ACCOUNT);

    adminApp = initializeAdminApp({
      credential: cert(serviceAccount),
    });

    adminAuth = getAdminAuth(adminApp);
  }
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
}

export { auth, adminAuth };
