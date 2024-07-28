import { Contestant } from "@/types";

type AppContextType = {
  allContestants: Contestant[];
  contestantError?: any;
  contestantIsLoading: boolean;

  // serIsLoading: boolean;
  // isProAndSerTypeLoding: boolean;
  // proAndSerTypeError?: any;
  // getServiceTypes(): TypesOfProductOrServiceType[];
  // getProductTypes(): TypesOfProductOrServiceType[];
  // getServiceByTypes(typeId: string): SalonServiceType[];
  // getProductByTypes(typeId: string): SalonProductType[];
  // allStaff?: WorkersType[];
  // staffError?: any;
  // staffIsLoading: boolean;
  // proCollectionSize?: number;
  // serCollectionSize?: number;
  // staffCollectionSize?: number;
  // allProductSales?: ProductSalesType[];
  // allServiceSales?: ServiceSalesType[];
  // serviceSalesError?: any;
  // serviceSalesIsLoading: boolean;
  // productSalesError?: any;
  // productSalesIsLoading: boolean;
  // getTotalInAllSales(): number;
  // getAmountOfSales(): number;
  // getSalesMetrics(): {
  //   salesByMonth: SalesByMonth;
  //   salesByWeek: SalesByWeek;
  //   salesByYear: SalesByYear;
  // };
};
