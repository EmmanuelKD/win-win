"use client";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  Timestamp,
  increment,
  onSnapshot,
  where,
} from "firebase/firestore";
import _ from "lodash";
import { SalonServiceType, TypesOfProductOrServiceType } from "../../types";
import { app } from "../config";
import { F_DB } from "../database";
import { TypeOfProductOrService } from "./product-and-service-type";

export class SalonServices extends F_DB {
  constructor() {
    super(app, "salon-service");
  }

  async addListener(onDone: (snapshot: QuerySnapshot<DocumentData>) => void) {
    let docRef = this.getCollectionRef();
    if (docRef) {
      return onSnapshot(docRef, onDone);
    }
  }

  async saveServiceData(data: SalonServiceType) {
    console.log("data:", data);
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.addToDocumentCollection({
      docId: data.id,
      data: _data,
    });
  }

  async updateServiceCount(data: SalonServiceType, newQuantity: number) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.updateDocument({
      documentId: data.id as string,
      data: {
        ..._data,
        quantity: newQuantity,
      },
    });
  }

  async deleteService(serviceId: string) {
    return await this.deleteDocument({
      documentId: serviceId,
    });
  }

  // updateServiceCount
  async getServiceById(serviceId?: string) {
    return this.getDocumentDataByCondition({
      conditions: serviceId ? [where("id", "==", serviceId)] : [],
    }).then((snap) => {
      if (!snap?.empty) {
        return snap?.docs.map((doc) => {
          return doc.data() as SalonServiceType;
        })[0];
      } else {
        return null;
      }
    });
  }

  async getAllSalonServicesByPagnation({
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
              return doc.data() as SalonServiceType;
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
  
  async updateSaloneTypeOfSaloneServiceCount({
    serviceId,
    plusCount,
    minusCount,
  }: {
    serviceId: string;
    plusCount?: number;
    minusCount?: number;
  }) {
    let top = new TypeOfProductOrService();

    return top.updateTypeOfProduct<TypesOfProductOrServiceType>({
      id: serviceId,
      servicesCount: plusCount
        ? increment(plusCount)
        : plusCount
        ? increment(-(minusCount ?? 0))
        : undefined,
      lastUpdatedDate: Timestamp.fromDate(new Date()),
    } as any);
  }
}
