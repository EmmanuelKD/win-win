"use client";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  onSnapshot
} from "firebase/firestore";
import { ServiceSalesType } from "../../types";
import { app } from "../config";
import { F_DB } from "../database";
import _ from "lodash";

export class ServiceSales extends F_DB {
  constructor() {
    super(app, "service-sales");
  }

  async addListener(onDone: (snapshot: QuerySnapshot<DocumentData>) => void) {
    let docRef = this.getCollectionRef();
    if (docRef) {
      onSnapshot(docRef, onDone);
    }
  }

  async addMultiProductSales(data: ServiceSalesType[]) {
    let _data = data.map((d)=>_(d).omitBy(_.isUndefined).value() as ServiceSalesType);
   
    return await this.addMultipleDocumentToCollection({data:_data}); 
  }
  async getAllSales({
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
              return doc.data() as ServiceSalesType;
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
