import firebase from "firebase";
import FieldValue = firebase.firestore.FieldValue;

export class Folder {
  id: string
  name: string
  parentId: string
  userId: string
  path: object[]
  createdAt: FieldValue
}
export const ROOT_FOLDER: Folder = {
  createdAt: null,
  id: "",
  name: "ROOT",
  parentId: "",
  path: [],
  userId: ""
}
