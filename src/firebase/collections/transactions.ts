"use client";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  onSnapshot,
  where,
} from "firebase/firestore";
import { F_DB } from "../database";
import { app } from "../config";
import _ from "lodash";
import { Transaction } from "../../types";

export class TransactionsClass extends F_DB {
  constructor() {
    super(app, "workers");
  }

  async addListener(onDone: (snapshot: QuerySnapshot<DocumentData>) => void) {
    let docRef = this.getCollectionRef();
    if (docRef) {
      return onSnapshot(docRef, onDone);
    }
  }

  async createTransaction(data: Transaction) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.addToDocumentCollection({
      docId: data.id,
      data: _data,
    });
  }

  async getTransactionById(tId?: string) {
    return this.getDocumentDataByCondition({
      conditions: tId ? [where("id", "==", tId)] : [],
    }).then((snap) => {
      if (!snap?.empty) {
        return snap?.docs.map((doc) => {
          return doc.data() as Transaction;
        })[0];
      } else {
        return null;
      }
    });
  }


  async getAllTransactions({
    count,
    lastVisible,
  }: {
    count?: number;
    lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
  }) {
    
    return this.getPageDocumentDataByCondition({ conditions: [], count, lastVisible }).then(
      (snap) => {
        if (!snap?.snp.empty) {
          return {
            data: snap?.snp.docs.map((doc) => {
              return doc.data() as Transaction;
            }),
            newlastVisible: snap?.lastVisible,
            collectionSize: snap?.collectionSize,
            isLastSetsOfDocs: snap?.isLastSetsOfDocs,
          };
        } else {
          return null;
        }
      }
    );
  }
}
