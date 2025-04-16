"use client";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  onSnapshot,
} from "firebase/firestore";
import _ from "lodash";
import { Contestant } from "../../types";
import { app } from "../config";
import { F_DB } from "../database";

export class Contestants extends F_DB {
  constructor() {
    super(app, "contestants");
  }

  async addListener(onDone: (snapshot: QuerySnapshot<DocumentData>) => void) {
    let docRef = this.getCollectionRef();
    if (docRef) {
      onSnapshot(docRef, onDone);
    }
  }

  async createNewContestant(data: Contestant) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.addToDocumentCollection({
      docId: data.id,
      data: _data,
    });
  }

  async evictContestants(data: Contestant, evicted: boolean) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.updateDocument({
      documentId: data.id as string,
      data: {
        ..._data,
        status: evicted ? "evicted" : "active",
      },
      //  as WorkersType,
    });
  }

  async getAllContestant({
    count,
    lastVisible,
  }: {
    count?: number;
    lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
  }) {
    return this.getPageDocumentDataByCondition({
      conditions: [],
      count,
      lastVisible,
    }).then((snap) => {
      if (!snap?.snp.empty) {
        return {
          data: snap?.snp.docs.map((doc) => {
            return doc.data() as Contestant;
          }),
          newlastVisible: snap?.lastVisible,
          collectionSize: snap?.collectionSize,
          isLastSetsOfDocs: snap?.isLastSetsOfDocs,
        };
      } else {
        return null;
      }
    });
  }
}
