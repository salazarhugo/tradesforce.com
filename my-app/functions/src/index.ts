import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'

const firebase_tools = require('firebase-tools');

admin.initializeApp()
const db = admin.firestore()
const app: any = express()
const fts = functions.region('europe-west2')

export const ap = functions.https.onRequest(app)


export const AddTrade = fts.https.onRequest((req, res) => {
  const trade = JSON.parse(req.body.tradeObj)
  const userId = req.body.userID
  trade.quantity = Number(trade.quantity)
  trade.entrydate = new Date(trade.entrydate)
  trade.exitdate = new Date(trade.exitdate)
  trade.entryprice = Number(trade.entryprice)
  trade.exitprice = Number(trade.exitprice)
  trade.stoploss = Number(trade.stoploss)
  trade.takeprofit = Number(trade.takeprofit)
  trade.profit = Number(trade.profit)
  trade.riskreward = Number(trade.riskreward)
  trade.commission = Number(trade.commission)
  trade.swap = Number(trade.swap)
  trade.userId = userId

  return db.collection("trades")
    .where('userId', '==', userId)
    .where('metatradeId', '==', trade.metatradeId)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        const docRef = db.collection("trades").doc();
        trade.id = docRef.id;
        return docRef.set(trade);
      } else
        return;
        // return snapshot.docs[0].ref.set(trade, {merge: true});
    }).then(() => {
      res.status(200).json("Document successfully added!")
      return
    }).catch(err => {
      console.log(err);
      res.status(400).send(err)
      return
    })
});

export const deleteFirestoreUser = functions.auth.user().onDelete((user) => {
  db.collection("users").doc(user.uid).delete().then(function () {
    console.log("Document successfully deleted!")
  }).catch(function (error) {
    console.error("Error removing document: ", error)
  })
})

export const deleteFile =
  fts.firestore.document('file/{fileId}')
    .onDelete((doc, context) => {
      const bucket = admin.storage().bucket();
      const file = doc.data();
      const filePath = !file.folderId
        ? `files/${file.userId}/${file.name}`
        : `files/${file.userId}/${file.name}`
      return bucket.file(filePath).delete();
    })

export const portfolioStockCounter =
  functions.firestore.document('users/{userId}/portfolios/{portfolioId}/stocks/{stockId}')
    .onWrite((change, context) => {

      const docRef = change.after.ref.parent.parent?.path
      if (docRef == null) return

      if (!change.before.exists) {
        // New document Created : add one to count
        db.doc(docRef).update({stockCount: admin.firestore.FieldValue.increment(1)}).then(res => {
          console.log("Document successfully updated!")
        }).catch(err => console.log(err));
      } else if (change.before.exists && change.after.exists) { // Updating existing document : Do nothing
      } else if (!change.after.exists) {
        // Deleting document : subtract one from count
        db.doc(docRef).update({stockCount: admin.firestore.FieldValue.increment(-1)}).then(res => {
          console.log("Document successfully updated!")
        }).catch(err => console.log(err));
      }

      return;
    });

export const recursiveDelete =
  functions.runWith({
    timeoutSeconds: 540,
    memory: '2GB'
  }).https.onCall(async (data, context) => {
      if (!(context.auth && context.auth.token)) {
        throw new functions.https.HttpsError(
          'permission-denied',
          'Must be an administrative user to initiate delete.'
        );
      }
      // Only allow admin users to execute this function.
      // if (!(context.auth && context.auth.token && context.auth.token.admin)) {
      //   throw new functions.https.HttpsError(
      //     'permission-denied',
      //     'Must be an administrative user to initiate delete.'
      //   );
      // }

      const path = data.path;
      // console.log(
      //   `User ${context.auth.uid} has requested to delete path ${path}`
      // );

      // Run a recursive delete on the given document or collection path.
      // The 'token' must be set in the functions config, and can be generated
      // at the command line by running 'firebase login:ci'.
      // db.collection("").doc("wdwa").delete()
      await firebase_tools.firestore
        .delete(path, {
          project: process.env.GCLOUD_PROJECT,
          recursive: true,
          yes: true,
          // token: functions.config().fb.token
        });

      return {
        path: path
      };
    }
  );
