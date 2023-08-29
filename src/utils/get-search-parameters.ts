import { ReadonlyURLSearchParams } from "next/navigation";

const getSearchParameters = (search: ReadonlyURLSearchParams) => {
  // TODO: Fix this
  // @ts-ignore
  return new URLSearchParams(search.entries()).toString().split("=")[1];
};

export default getSearchParameters;
