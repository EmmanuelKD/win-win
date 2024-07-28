"use client";
import { UploadResult, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "./config";

export class FileStorage {
  constructor() {
    // super(app, 'printJobs');
  }

  async addStaffProfileToStorage(file: File, usersId: string) {
    const destinationFolder = "files/staff/" + usersId;
    // console.log(file.type)
    let _tsk = await this.uploadFile(
      file,
      `${destinationFolder}/profile.${file.type.replace("image/", "")}`
    );
    return await getDownloadURL(_tsk.ref);
  }
  async addUsersProfileToStorage(file: File, usersId: string) {
    const destinationFolder = "files/users/" + usersId;
    // console.log(file.type)
    let _tsk = await this.uploadFile(
      file,
      `${destinationFolder}/profile.${file.type.replace("image/", "")}`
    );
    return await getDownloadURL(_tsk.ref);
  }

  async addProductImagesToStorage(files: File[], productId: string) {
    const destinationFolder = "files/products/" + productId;

    return this.uploadFilesAsBatch(files, destinationFolder).then((task) => {
      let downloadRef = task.map(async (_tsk) => {
        return await getDownloadURL(_tsk.ref);
      });
      return   Promise.all(downloadRef);
    });
  }

 
  async addServiceImageToStorage(file: File, productId: string) {
    const destinationFolder = "files/products/" + productId;
    let _tsk = await this.uploadFile(
      file,
      `${destinationFolder}.${file.type.replace("image/", "")}`
    );

    return await getDownloadURL(_tsk.ref);
  }
  
  async addProductImageToStorage(file: File, productId: string) {
    const destinationFolder = "files/products/" + productId;
    let _tsk = await this.uploadFile(
      file,
      `${destinationFolder}.${file.type.replace("image/", "")}`
    );

    return await getDownloadURL(_tsk.ref);
  }

  async addProductCategoriesImagesToStorage(file: File, catName: string) {
    const destinationFolder = "files/products-cat";

    let _tsk = await this.uploadFile(
      file,
      `${destinationFolder}/${catName}.${file.type.replace("image/", "")}`
    );
    return await getDownloadURL(_tsk.ref);
  }

  private async uploadFilesAsBatch(
    files: File[],
    destinationFolder: string
  ): Promise<UploadResult[]> {
    const uploadPromises = files.map((file) => {
      const filePath = `${destinationFolder}/${file.name}.${file.type.replace("image/", "")}`;
      const fileRef = ref(storage, filePath);
      return uploadBytes(fileRef, file);
    });
    return await Promise.all(uploadPromises);
  }

  private async uploadFile(file: File, destinationFolder: string): Promise<UploadResult> {
    const fileRef = ref(storage, destinationFolder);
    return await uploadBytes(fileRef, file);
  }
}
