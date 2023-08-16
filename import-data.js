const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://my-ionic-playground.firebaseio.com' // e.g., 'https://your-project-id.firebaseio.com'
});

const db = admin.firestore();

async function importData() {
    const data = JSON.parse(fs.readFileSync('testData.json', 'utf8'));

    // Use batched writes for efficiency
    const batch = db.batch();

    data.forEach((item, index) => {
        const docRef = db.collection('category').doc(`category_${index + 1}`);
        batch.set(docRef, item);
    });

    await batch.commit();
    console.log('Data successfully written to Firestore!');
}

importData().catch(console.error);
