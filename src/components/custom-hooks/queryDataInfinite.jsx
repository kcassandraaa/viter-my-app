import { queryData } from "./queryData";

export const queryDataInfinite = (
  //LOAD MORE STEP 8 -> Services.jsx
  urlSearch,
  urlList,
  isSearch = false,
  searchData = isSearch ? searchData : {},
  method = "get"
) => {
 return queryData(isSearch ? urlSearch : urlList, method, searchData);
};
