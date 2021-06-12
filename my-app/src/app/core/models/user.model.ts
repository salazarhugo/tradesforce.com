import {Role} from './role';


export class FirebaseUserModel {
  name: string
  photoUrl: string
  email: string
  emailVerified: boolean
  phoneNumber: string
  uid: string
  provider: string
  country: any
  role: Role
  creationTime: Date
  lastSignInTime: Date
  verified: boolean
  admin: boolean

  constructor() {
    this.photoUrl = "";
    this.name = "";
    this.email = "";
    this.provider = "";
    this.role = Role.User
  }
}
