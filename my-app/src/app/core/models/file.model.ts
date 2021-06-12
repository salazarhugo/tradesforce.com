import firebase from "firebase";
import FieldValue = firebase.firestore.FieldValue;

export interface File {
  id: string
  folderId: string
  userId: string
  name: string
  url: string
  createdAt: FieldValue
}
