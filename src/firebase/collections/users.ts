"use client";
import { DocumentData, QuerySnapshot, onSnapshot, where } from "firebase/firestore";
import { F_DB } from "../database";
import { app } from "../config";
import _ from "lodash";
import { UserType } from "../../types";

export class UsersClass extends F_DB {
  constructor() {
    super(app, "users");
  }

  async addListener(onDone: (snapshot: QuerySnapshot<DocumentData>) => void) {
    let docRef = this.getCollectionRef();
    if (docRef) {
      onSnapshot(docRef, onDone);
    }
  }

  async saveUsersData(data: UserType) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.addToDocumentCollection({
      docId: data.id,
      data: _data,
    });
  }

  async updateUsersData(data: UserType) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.updateDocument({
      documentId: data.id as string,
      data: _data,
    });
  }

  async getUsersById(userId?: string) {
    return this.getDocumentDataByCondition({
      conditions: userId ? [where("id", "==", userId)] : [],
    }).then((snap) => {
      if (!snap?.empty) {
        return snap?.docs.map((doc) => {
          return doc.data() as UserType;
        })[0];
      } else {
        return null;
      }
    });
  }


  async deleteUser(userId: string) {
    return await this.deleteDocument({
      documentId: userId,
    });
  }

  async getAllUsers() {
    return this.getDocumentDataByCondition({ conditions: [] }).then((snap) => {
      if (!snap?.empty) {
        return snap?.docs.map((doc) => {
          return doc.data() as UserType;
        });
      } else {
        return null;
      }
    });
  }
}
