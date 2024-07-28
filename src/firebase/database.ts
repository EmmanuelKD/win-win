"use client";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  QueryDocumentSnapshot,
  QueryFieldFilterConstraint,
  QuerySnapshot,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  endAt,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAfter,
  startAt,
  writeBatch,
} from "firebase/firestore";
import { array } from "yup";
// import uidV4 from ""

export class F_DB {
  protected db?: Firestore;
  protected analytics?: Analytics;
  protected collectionId: string;
  static _isEmulatorEnabled = false;

  constructor(app: FirebaseApp, collectiond?: string) {
    this.db = getFirestore(app);

    if (app.name && typeof window !== "undefined") {
      this.analytics = getAnalytics(app);
    }
    this.collectionId = collectiond as string;

    // if (IS_APP_LOCAL && !PrintDB._isEmulatorEnabled) {
    //     connectFirestoreEmulator(this.db, 'localhost', 8080);
    //     PrintDB._isEmulatorEnabled = true;
    // }
  }

  /**
   *
   * @param onComplete
   * @param collectionRef
   * @param docRef
   * @returns
   */
  protected onDocVlaueChange(
    onComplete: (data: DocumentSnapshot<DocumentData>) => void,
    docRef: string
  ) {
    if (this?.db) {
      const unsub = onSnapshot(doc(this.db, this.collectionId, docRef), (doc) => {
        onComplete(doc);
      });
      return unsub();
    } else {
      throw "auth not initialized";
    }
  }

  protected getCollectionRef(): CollectionReference<DocumentData> | null {
    try {
      if (this.db) return collection(this.db, this.collectionId);
      return null;
    } catch (e) {
      console.log("unknown error = " + JSON.stringify(e));
      return null;
    }
  }

  protected async getDocument({
    documentId,
  }: {
    documentId: string;
  }): Promise<DocumentReference<DocumentData> | null> {
    try {
      if (this.db) {
        return doc(collection(this.db, this.collectionId), documentId);
      }
      return null;
    } catch (e) {
      console.log("unknown error = " + JSON.stringify(e));
      return null;
    }
  }

  protected async getDocumentDataByCondition({
    conditions,
  }: {
    conditions: QueryFieldFilterConstraint[];
  }): Promise<QuerySnapshot<DocumentData> | null> {
    try {
      if (this.db) {
        var db = this.db;
        var q = query(collection(db, this.collectionId), ...conditions);
        return await getDocs(q);
      }
      return null;
    } catch (e) {
      console.log("unknown error = " + JSON.stringify(e));
      return null;
    }
  }

  protected async getPageDocumentDataByCondition({
    conditions,
    count,
    lastVisible,
  }: {
    conditions: QueryFieldFilterConstraint[];
    count?: number;
    lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
  }): Promise<{
    snp: QuerySnapshot<DocumentData>;
    lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData>;
    collectionSize: number;
    isLastSetsOfDocs: boolean;
  } | null> {
    try {
      if (this.db) {
        var db = this.db;
        var q;
        if (count) {
          if (lastVisible) {
            q = query(
              collection(db, this.collectionId),
              ...conditions,
              orderBy("createdAt"),
              startAfter(lastVisible),
              limit(count)
            );
          } else {
            q = query(
              collection(db, this.collectionId),
              ...conditions,
              orderBy("createdAt"),
              limit(count)
            );
          }
        } else {
          q = query(collection(db, this.collectionId), ...conditions, orderBy("createdAt"));
        }
        let snp = await getDocs(q);
        const nlv = snp.docs[snp.docs.length - 1];
        let isLastSetsOfDocs = count ? nlv === lastVisible || count > snp.size : true;
        // console.log(isLastSetsOfDocs);
        // console.log(nlv, lastVisible);
        return { snp, isLastSetsOfDocs, lastVisible: nlv, collectionSize: snp.size };
      }
      return null;
    } catch (e) {
      console.log("unknown error = " + JSON.stringify(e));
      return null;
    }
  }

  protected async getDocumentDataById({
    docId,
  }: {
    docId: string;
  }): Promise<DocumentSnapshot<DocumentData> | null> {
    try {
      if (this.db) {
        var docRef = (await this.getDocument({
          documentId: docId,
        })) as DocumentReference<DocumentData>;
        return await getDoc(docRef);
      }
      return null;
    } catch (e) {
      console.log("unknown error = " + JSON.stringify(e));
      return null;
    }
  }

  /**
   *
   * @param param0
   * @return Promise<string> id or null of the document added
   */

  protected async addToDocumentCollection({
    docId,
    data,
  }: {
    data: DocumentData;
    docId?: string;
  }): Promise<string | null> {
    if (this.db) {
      if (docId) {
        await setDoc(doc(collection(this?.db, this.collectionId), docId), data);
        return docId;
      } else {
        return (await addDoc(collection(this?.db, this.collectionId), data)).id;
      }
    }
    return null;
  }

  protected async addMultipleDocumentToCollection({
    data,
  }: {
    data: DocumentData[];
  }): Promise<string[] | null> {
    
    if (this.db) {
      const batch = writeBatch(this.db);
      const addedDocIds: string[] = [];

      data.forEach((d) => {
        const newDocRef = doc(collection(this.db as Firestore, this.collectionId));
        d.id=newDocRef.id;
        batch.set(newDocRef, d);
        addedDocIds.push(newDocRef.id);
      });

      await batch.commit();
      return addedDocIds;
    }

    return null;
  }

  protected async addToDocumentArray({
    docId,
    arrayKey,
    value,
  }: {
    arrayKey: any;
    value: any;
    docId?: string;
  }): Promise<string | null> {
    if (this.db) {
      if (Array.isArray(value)) {
        await setDoc(
          doc(collection(this?.db, this.collectionId), docId),
          {
            [arrayKey]: arrayUnion(...value),
          },
          { merge: true }
        );
      } else {
        await setDoc(
          doc(collection(this?.db, this.collectionId), docId),
          {
            [arrayKey]: arrayUnion(value),
          },
          { merge: true }
        );
      }
    }
    return null;
  }

  protected async removeFromDocumentArray({
    docId,
    arrayKey,
    value,
  }: {
    arrayKey: any;
    value: any;
    docId?: string;
  }): Promise<string | null> {
    if (this.db) {
      await setDoc(
        doc(collection(this?.db, this.collectionId), docId),
        {
          [arrayKey]: arrayRemove(value),
        },
        { merge: true }
      );
    }
    return null;
  }

  protected async removeArrayFromDocument({
    docId,
    arrayKey,
  }: {
    arrayKey: any;
    docId?: string;
  }): Promise<string | null> {
    if (this.db) {
      await setDoc(
        doc(collection(this?.db, this.collectionId), docId),
        {
          [arrayKey]: [],
        },
        { merge: true }
      );
    }
    return null;
  }

  protected async replaceArrayFromDocument({
    docId,
    arrayKey,
    values,
  }: {
    arrayKey: any;
    docId?: string;
    values: any[];
  }): Promise<string | null> {
    if (this.db) {
      await setDoc(
        doc(collection(this?.db, this.collectionId), docId),
        {
          [arrayKey]: values,
        },
        { merge: true }
      );
    }
    return null;
  }

  /**
   *
   * @param param0
   * @return Promise<boolean> if the update was successful or not
   */
  protected async updateDocument({
    documentId,
    data,
  }: {
    documentId: string;
    data: DocumentData;
  }): Promise<boolean> {
    try {
      var doc = (await this.getDocument({
        documentId,
      })) as DocumentReference<DocumentData>;

      return await setDoc(doc, data, {
        merge: true,
      })
        .then((res) => {
          return true;
        })
        .catch(() => {
          return false;
        });
    } catch (e) {
      logEvent(
        this.analytics as Analytics,
        "Failing to update document, get error message: " + JSON.stringify(e)
      );
    }
    return false;
  }

  /**
   *
   * @param param0
   * @return Promise<boolean> if the delete was successful or not
   */
  protected async deleteDocument({ documentId }: { documentId: string }): Promise<boolean> {
    try {
      var doc = (await this.getDocument({
        documentId,
      })) as DocumentReference<DocumentData>;

      return await deleteDoc(doc)
        .then((res) => {
          return true;
        })
        .catch(() => {
          logEvent(this.analytics as Analytics, "Failing to delete document");
          return false;
        });
    } catch (e) {
      console.log("unknown error = " + JSON.stringify(e));
      return false;
    }
  }
}
