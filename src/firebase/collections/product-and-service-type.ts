"use client";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  onSnapshot,
  where,
} from "firebase/firestore";
import _, { orderBy } from "lodash";
import { app } from "../config";
import { F_DB } from "../database";
import { TypesOfProductOrServiceType } from "../../types";

type haseID = {
  id: string;
};

export class TypeOfProductOrService extends F_DB {
  constructor() {
    super(app, "product-and-service-type");
  }

  async addListener(onDone: (snapshot: QuerySnapshot<DocumentData>) => void) {
    let docRef = this.getCollectionRef();
    if (docRef) {
      onSnapshot(docRef, onDone);
    }
  }

  async saveTypeOfProductData(data: TypesOfProductOrServiceType) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.addToDocumentCollection({
      docId: data.id,
      data: _data,
    });
  }

  async deleteTypeOf(productId: string) {
    return await this.deleteDocument({
      documentId: productId,
    });
  }

  async getTypeOfProductsByBusiness(
    type: "Product" | "Service",
    businessType: "Electronic" | "Salon"
  ) {
    return this.getDocumentDataByCondition({
      conditions: [where("business", "==", businessType), where("type", "==", type)],
    }).then((snap) => {
      if (!snap?.empty) {
        return snap?.docs.map((doc) => {
          return doc.data() as TypesOfProductOrServiceType;
        });
      } else {
        return null;
      }
    });
  }

  async getAllTypeOfProductsAndService({
    count,
    lastVisible,
    businessType,
  }: {
    count?: number;
    lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
    businessType: "Electronic" | "Salon";
  }) {
    return this.getPageDocumentDataByCondition({
      conditions: [where("business", "==", businessType)],
      count,
      lastVisible,
    }).then((snap) => {
      if (!snap?.snp.empty) {
        return {
          data: snap?.snp.docs.map((doc) => {
            return doc.data() as TypesOfProductOrServiceType;
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

  async getAllTypeOfProductsByPagnation({
    count,
    lastVisible,
    type,
    businessType,
  }: {
    count?: number;
    lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
    type: "Product" | "Service";
    businessType: "Electronic" | "Salon";
  }) {
    return this.getPageDocumentDataByCondition({
      conditions: [where("business", "==", businessType), where("type", "==", type)],
      count,
      lastVisible,
    }).then((snap) => {
      if (!snap?.snp.empty) {
        return {
          data: snap?.snp.docs.map((doc) => {
            return doc.data() as TypesOfProductOrServiceType;
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

  async updateTypeOfProduct<T extends haseID>(mergeData: T) {
    let _data = _(mergeData).omitBy(_.isUndefined).value();
    return await this.updateDocument({
      documentId: mergeData.id,
      data: _data,
    });
  }
}
