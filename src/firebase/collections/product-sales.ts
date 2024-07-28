"use client";
import {
  CollectionReference,
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  Timestamp,
  getCountFromServer,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import _ from "lodash";
import { app } from "../config";
import { F_DB } from "../database";
import { ProductSalesType } from "../../types";

export class ProductsSales extends F_DB {
  constructor() {
    super(app, "product-sales");
  }

  async addListener(onDone: (snapshot: QuerySnapshot<DocumentData>) => void) {
    let docRef = this.getCollectionRef();
    if (docRef) {
      onSnapshot(docRef, onDone);
    }
  }

  async addProductSales(data: ProductSalesType) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.addToDocumentCollection({
      docId: data.id,
      data: _data,
    });
    // add new transaction
    // add income
  }

  async addMultiProductSales(data: ProductSalesType[]) {
    let _data = data.map((d) => _(d).omitBy(_.isUndefined).value() as ProductSalesType);

    return await this.addMultipleDocumentToCollection({ data: _data });
  }
  async updateProductSales(data: ProductSalesType) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.updateDocument({
      documentId: data.id as string,
      data: _data,
    });
    // update transaction
    // update income
  }
  async getSalesReport(by: "Week" | "Month" | "Year") {
    return this.getDocumentDataByCondition({
      conditions: switchBy(by),
    }).then((snap) => {
      if (!snap?.empty) {
        return snap?.docs.map((doc) => {
          return doc.data() as ProductSalesType;
        })[0];
      } else {
        return null;
      }
    });
  }

  async getProductsWithHighestSales() {
    //     totalUnitSold
    // totalAmountGenerated
    return this.getDocumentDataByCondition({
      conditions: [],
    }).then((snap) => {
      if (!snap?.empty) {
        return snap?.docs.map((doc) => {
          return doc.data() as ProductSalesType;
        })[0];
      } else {
        return null;
      }
    });
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
              return doc.data() as ProductSalesType;
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

export function switchBy(by: "Week" | "Month" | "Year") {
  const currentDate = new Date();

  switch (by) {
    case "Month": {
      // Calculate the start of the current month
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

      // Calculate the end of the current month
      const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

      const endOfMonth =
        // @ts-ignore
        new Date(nextMonth - 1);

      // Convert the dates to timestamps
      const startTimestamp = Timestamp.fromDate(startOfMonth);
      const endTimestamp = Timestamp.fromDate(endOfMonth);

      return [where("createdAt", ">=", startTimestamp), where("createdAt", "<=", endTimestamp)];
    }
    case "Week": {
      // Calculate the start of the current week (Sunday)
      const startOfWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
      );

      // Calculate the end of the current week (Saturday)
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      // Convert the dates to timestamps
      const startTimestamp = Timestamp.fromDate(startOfWeek);
      const endTimestamp = Timestamp.fromDate(endOfWeek);

      return [where("createdAt", ">=", startTimestamp), where("createdAt", "<=", endTimestamp)];
    }
    case "Year": {
      // Get the current date and time
      const currentDate = new Date();

      // Calculate the start of the current year
      const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

      // Calculate the end of the current year
      const endOfYear = new Date(currentDate.getFullYear() + 1, 0, 1);

      // Convert the dates to timestamps
      const startTimestamp = Timestamp.fromDate(startOfYear);
      const endTimestamp = Timestamp.fromDate(endOfYear);

      return [where("createdAt", ">=", startTimestamp), where("createdAt", "<=", endTimestamp)];
    }

    default:
      return [];
  }
}
