"use client";
import { DocumentData, QuerySnapshot, limit, onSnapshot, where } from "firebase/firestore";
import _, { orderBy } from "lodash";
import { app } from "../config";
import { F_DB } from "../database";
import { ElectronicProductType, TypesOfProductOrServiceType } from "../../types";
import { UsersClass } from "./users";
import { ProductsSales } from "./product-sales";

export class ElectronicProduct extends F_DB {
  constructor() {
    super(app, "electronic-product");
  }

  async addListener(onDone: (snapshot: QuerySnapshot<DocumentData>) => void) {
    let docRef = this.getCollectionRef();
    if (docRef) {
      onSnapshot(docRef, onDone);
    }
  }

  async saveProductData(data: ElectronicProductType) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.addToDocumentCollection({
      docId: data.id,
      data: _data,
    });
  }

  async updateProductCount(data: ElectronicProductType, newQuantity: number) {
    let _data = _(data).omitBy(_.isUndefined).value();
    return await this.updateDocument({
      documentId: data.id as string,
      data: {
        ..._data,
        quantity: newQuantity,
      },
    });
  }

  async getProductById(productId?: string) {
    return this.getDocumentDataByCondition({
      conditions: productId ? [where("id", "==", productId)] : [],
    }).then((snap) => {
      if (!snap?.empty) {
        return snap?.docs.map((doc) => {
          return doc.data() as ElectronicProductType;
        })[0];
      } else {
        return null;
      }
    });
  }


  async getProductsWithHighestSales() {
    let sales= new ProductsSales()

    sales.getProductsWithHighestSales()
  }

  async deleteProduct(productId: string) {
    return await this.deleteDocument({
      documentId: productId,
    });
  }

  async getAllProducts() {
    return this.getDocumentDataByCondition({
      conditions: [],
    }).then((snap) => {
      if (!snap?.empty) {
        return snap?.docs.map((doc) => {
          return doc.data() as ElectronicProductType;
        });
      } else {
        return null;
      }
    });
  }
}
