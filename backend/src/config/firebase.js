const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

let db;

if (serviceAccount.projectId && serviceAccount.privateKey && serviceAccount.clientEmail) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    db = admin.firestore();
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error.message);
  }
} else {
  console.warn('⚠️ Firebase Admin credentials missing in .env. Firestore and Auth will not work.');
}

module.exports = { admin, db };
