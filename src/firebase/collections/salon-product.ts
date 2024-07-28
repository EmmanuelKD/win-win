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
import { SalonProductType, TypesOfProductOrServiceType } from "../../types";
import { app } from "../config";
import { F_DB } from "../database";
import { TypeOfProductOrService } from "./product-and-service-type";

export class SalonProducts extends F_DB {
  constructor() {
    super(app, "salon-products");
  }

  async addListener(onDone: (snapshot: QuerySnapshot<DocumentData>) => void) {
    let docRef = this.getCollectionRef();
    if (docRef) {
      return onSnapshot(docRef, onDone);
    }
  }

  async saveProductData(data: SalonProductType) {
    console.log("data:", data);
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.addToDocumentCollection({
      docId: data.id,
      data: _data,
    });
  }

  async updateProductCount(data: SalonProductType, newQuantity: number) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.updateDocument({
      documentId: data.id as string,
      data: {
        ..._data,
        quantity: newQuantity,
      },
    });
  }

  async deleteProduct(productId: string) {
    return await this.deleteDocument({
      documentId: productId,
    });
  }

  // updateProductCount
  async getProductById(productId?: string) {
    return this.getDocumentDataByCondition({
      conditions: productId ? [where("id", "==", productId)] : [],
    }).then((snap) => {
      if (!snap?.empty) {
        return snap?.docs.map((doc) => {
          return doc.data() as SalonProductType;
        })[0];
      } else {
        return null;
      }
    });
  }

  async getAllSalonProductsByTypePagnated({
    count,
    lastVisible,
    typeId,
  }: {
    typeId: string;
    count?: number;
    lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
  }) {
    return this.getPageDocumentDataByCondition({
      conditions: [where("typeId", "==", typeId)],
      count,
      lastVisible,
    }).then((snap) => {
      if (!snap?.snp.empty) {
        return {
          data: snap?.snp.docs.map((doc) => {
            return doc.data() as SalonProductType;
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

  async getAllSalonProductsByPagnation({
    count,
    lastVisible,
  }: {
    count?: number;
    lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
  }) {
    return this.getPageDocumentDataByCondition({ conditions: [

    ], count, lastVisible }).then(
      (snap) => {
        if (!snap?.snp.empty) {
          return {
            data: snap?.snp.docs.map((doc) => {
              return doc.data() as SalonProductType;
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
   
  async updateSaloneTypeOfSaloneProductCount({
    productId,
    plusCount,
    minusCount,
  }: {
    productId: string;
    plusCount?: number;
    minusCount?: number;
  }) {
    let top = new TypeOfProductOrService();

    return top.updateTypeOfProduct<TypesOfProductOrServiceType>({
      id: productId,
      productsCount: plusCount
        ? increment(plusCount)
        : plusCount
        ? increment(-(minusCount ?? 0))
        : undefined,
      lastUpdatedDate: Timestamp.fromDate(new Date()),
    } as any);
  }

  async getAllSalonProductsByTypeId({
    count,
    lastVisible,
    typeId,
    type,
  }: {
    typeId: string;
    count?: number;
    type: "Product" | "Service";
    lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
  }) {
    return this.getPageDocumentDataByCondition({
      conditions: [where("typeId", "==", typeId)],
      count,
      lastVisible,
    }).then((snap) => {
      if (!snap?.snp.empty) {
        return {
          data: snap?.snp.docs.map((doc) => {
            return doc.data() as SalonProductType;
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
