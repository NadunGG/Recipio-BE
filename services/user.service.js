
import { admin, bucket } from '../config/firebase.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async (email, password, displayName) => {
  const user = await admin.auth().createUser({ email, password, displayName });
  return { uid: user.uid, email: user.email, displayName: user.displayName };
};

export const loginUser = async (email, password) => {
  throw new Error('Use Firebase Client SDK for login to get ID Token');
};

export const getUserProfile = async (uid) => {
  const user = await admin.auth().getUser(uid);
  const photoURL = user.photoURL || null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL,
  };
};

export const uploadProfilePicture = async (uid, fileBuffer, mimeType) => {
  const file = bucket.file(`profile_pictures/${uid}.jpg`);
  await file.save(fileBuffer, { contentType: mimeType, public: true });
  const photoURL = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
  await admin.auth().updateUser(uid, { photoURL });
  return photoURL;
};

