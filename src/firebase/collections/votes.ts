"use client";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  onSnapshot
} from "firebase/firestore";
import {  Vote } from "../../types";
import { app } from "../config";
import { F_DB } from "../database";
import _ from "lodash";

export class VotesClass extends F_DB {
  constructor() {
    super(app, "votes");
  }

  async addListener(onDone: (snapshot: QuerySnapshot<DocumentData>) => void) {
    let docRef = this.getCollectionRef();
    if (docRef) {
      onSnapshot(docRef, onDone);
    }
  }

  async createVote(data: Vote) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.addToDocumentCollection({
      docId: data.id,
      data: _data,
    });
  }

  
  async getAllVotes({
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
              return doc.data() as Vote;
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
