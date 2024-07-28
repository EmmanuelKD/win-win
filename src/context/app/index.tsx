import { ReactNode, useEffect, useMemo } from "react";
import { AppContext } from "./context";

export function AppContextProvider({ children }: { children: ReactNode }) {
  useEffect(() => {}, []);

  return (
    <AppContext.Provider
      value={useMemo(() => {
        return {
          allContestants: [],
          contestantIsLoading: false,
          contestantError: "",
        };
      }, [])}
    >
      {children}
    </AppContext.Provider>
  );
}


// const ENF_OF_PRODUCT_ERROR = { message: "No more fata to fetch" };

// function useLoadContastants({
//     count,
//     currentPosition,
//   }: {
//     count?: number;
//     currentPosition?: number;
//   }) {
//     const swrTag = `type-of-products-list`;
//     let typeOfProduct = new TypeOfProductOrService();
  
//     const [metadata, setMetadata] = useState<{
//       lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
//       collectionSize: number;
//       isLastSetsOfDocs: boolean;
//     }>({ collectionSize: 0, lastVisible: undefined, isLastSetsOfDocs: false });
  
//     const { collectionSize, lastVisible, isLastSetsOfDocs } = metadata;
  
//     const fetcher = async (path: string) => {
//       if (!isLastSetsOfDocs) {
//         return typeOfProduct
//           .getAllTypeOfProductsAndService({
//             count: 6,
//             lastVisible,
//             businessType: "Salon",
//           })
//           .then((ret) => {
//             if (ret?.newlastVisible) {
//               setMetadata({
//                 isLastSetsOfDocs: ret.isLastSetsOfDocs ?? true,
//                 lastVisible: ret?.newlastVisible,
//                 collectionSize: ret.collectionSize as number,
//               });
//             }
//             return ret?.data as TypesOfProductOrServiceType[];
//             return [];
//           });
//       }
//       throw ENF_OF_PRODUCT_ERROR;
//     };
  
//     const { data, error, isLoading } = useSWR<TypesOfProductOrServiceType[]>(swrTag, fetcher, {
//       shouldRetryOnError: false,
//       onError: (error) => {
//         if (ENF_OF_PRODUCT_ERROR.message === error.message) {
//           // toast.error(error.message);
//           return false;
//         } else {
//           // Retry for other types of errors
//           return true;
//         }
//       },
//     });
  
//     function updateCollectionSize({
//       plusCount,
//       minusCount,
//     }: {
//       plusCount?: number;
//       minusCount?: number;
//     }) {
//       setMetadata((prev) => ({
//         ...prev,
//         collectionSize: plusCount
//           ? prev.collectionSize + (plusCount ?? 0)
//           : prev.collectionSize - (minusCount ?? 0),
//       }));
//     }
  
//     return {
//       data,
//       isLoading,
//       error,
//       collectionSize,
//       updateCollectionSize,
//     };
//   }