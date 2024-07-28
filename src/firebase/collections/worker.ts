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
import { UserType, WorkersType } from "../../types";

export class WorkersClass extends F_DB {
  constructor() {
    super(app, "workers");
  }

  async addListener(onDone: (snapshot: QuerySnapshot<DocumentData>) => void) {
    let docRef = this.getCollectionRef();
    if (docRef) {
      return onSnapshot(docRef, onDone);
    }
  }

  async saveWorkerData(data: WorkersType) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.addToDocumentCollection({
      docId: data.id,
      data: _data,
    });
  }

  async updateWorkerData(data: WorkersType) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.updateDocument({
      documentId: data.id as string,
      data: _data,
    });
  }

  async suspendWorker(data: WorkersType, suspend: boolean) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.updateDocument({
      documentId: data.id as string,
      data: {
        ..._data,
        status: suspend ? "Suspended" : "Active",
      },
      //  as WorkersType,
    });
  }

  async getWorkerById(workerId?: string) {
    return this.getDocumentDataByCondition({
      conditions: workerId ? [where("id", "==", workerId)] : [],
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

  async deleteWorker(workerId: string) {
    return await this.deleteDocument({
      documentId: workerId,
    });
  }

  async getAllWorkers({
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
              return doc.data() as WorkersType;
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
