import admin from "firebase-admin";
import { readFile } from "fs/promises";

// Load Firebase service account credentials
const serviceAccount = JSON.parse(
  await readFile(
    new URL("../creditor-app-5e528-firebase-adminsdk-fbsvc-40719f1242.json", import.meta.url)
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://creditor-app-5e528.firebaseio.com", // Replace with your Firestore database URL
});

const db = admin.firestore();

// Read JSON file
const rawData = await readFile(new URL("./firestore_ready.json", import.meta.url));
const data = JSON.parse(rawData);

// Function to upload JSON data to Firestore
const uploadData = async () => {
  try {
    for (const key in data.customers) {
      await db.collection("customers").doc(key).set(data.customers[key]);
      console.log(`Uploaded customer: ${key}`);
    }
    for (const key in data.loans) {
      await db.collection("loans").doc(key).set(data.loans[key]);
      console.log(`Uploaded loan: ${key}`);
    }
    console.log("✅ Import complete!");
  } catch (error) {
    console.error("❌ Error uploading data:", error);
  }
};

// Run the import function
uploadData();
