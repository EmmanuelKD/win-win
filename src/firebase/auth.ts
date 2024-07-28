// https://firebase.google.com/docs/auth/web/facebook-login
"use client";

// import { AppUser, AuthUserType } from "@/types";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  User,
} from "firebase/auth";
import { UsersClass } from "./collections/users";
import { auth } from "./config";
import { UserType } from "../types";
import { NextRouter } from "next/router";
import { AuthContextType } from "../../contexts/auth-context";
import toast from "react-hot-toast";
import { Timestamp } from "firebase/firestore";

const LOCAL_USER_ID = "LocalUser";

export class AuthClass {
  userStore: UsersClass;

  constructor() {
    this.userStore = new UsersClass();
  }

  /**
   *
   * @param { email, password, authContext}
   */

  async loginWithEmailAndPassword({ email, password }: { email: string; password: string }) {
    return signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        let _user = await this.userStore.getUsersById(user.uid);
        if (_user) {
          this.saveUserToLocalStorage(_user);
          toast.success("users login successfully");
        }
        return _user;
      })
      .catch((error) => {
        toast.error(this.errorFirebase(error, email));
        return null;
      });
  }

  async createUserWithEmailAndPassword({
    email,
    password,
    fname,
    lname,
    phone,
    saveAvater,
  }: {
    email: string;
    fname: string;
    lname: string;
    phone: string;
    password: string;
    saveAvater?: (id: string) => Promise<string>;
  }) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        const user = result.user;
        let avatar = await saveAvater?.(user.uid);

        let auth = new UsersClass();
        let _user: UserType = {
          id: user.uid,
          email: user.email as string,
          fname,
          lname,
          phone,
          createdAt: Timestamp.fromDate(new Date()),
          avatar,
        };

        await auth.saveUsersData(_user);

        this.saveUserToLocalStorage(_user);
        toast.success("users created successfully");
      })
      .catch((error) => {
        toast.error(this.errorFirebase(error, email));
      });
  }

  /**
   * This is used to send verification email for  email and password signup only
   */
  async sendVerificationEmail() {
    await sendEmailVerification(auth.currentUser as User).then(() => {
      alert("Verification  mail sent");
    });
  }

  /**
   * This method is used to send reset password for email and password login only
   */
  async resetEmailPassword({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) {
    var user = auth.currentUser;

    if (user) {
      // var credential = EmailAuthProvider.credential(user?.email as string, oldPassword);
      return await updatePassword(user, newPassword);
      // reauthenticateWithCredential(user, credential);
    } else {
      toast.error("password changed fail");
    }
  }

  /**
   * This method is used to send reset password for email and password login only
   */
  sendResetUsersPasswordMail({ email }: { email: string }) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(`Password Resent mail mail sent successfully to this email ${email}`);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage =
        // let message = errorMessage;
        toast.error(error.message);
      });
  }

  signOutCurrentUser(authContext?: AuthContextType) {
    signOut(auth)
      .then(() => {
        this.removeUserToLocalStorage();
        authContext?.signOut();
      })
      .catch((error) => {
        alert("fail to sign out");
      });
  }

  onAuthStateChange(loadUserToState?: (user?: UserType) => void, navigate?: NextRouter) {
    onAuthStateChanged(auth, async (user) => {
      const currentUrl = window.location.href;
      if (user == null && currentUrl.includes("/screens/home/profile")) {
        this.removeUserToLocalStorage();
        loadUserToState?.(undefined);
        // navigate?.replace(routes.home.index);
      }
    });
  }

  removeUserToLocalStorage() {
    localStorage.removeItem(LOCAL_USER_ID);
  }

  saveUserToLocalStorage(user?: UserType) {
    if (user) {
      localStorage.setItem(LOCAL_USER_ID, JSON.stringify(user));
    }
  }

  getUserFromLocalStorage(): UserType | undefined {
    let userString = localStorage.getItem(LOCAL_USER_ID) as string;
    if (userString?.length > 0) {
      let userJson = JSON.parse(userString);
      return userJson as UserType;
    }
    return undefined;
  }

  errorFirebase(error: FirebaseError, email?: string) {
    // console.error(error)
    return error.code.replaceAll("auth/", "").replaceAll("-", " ");
  }
}
