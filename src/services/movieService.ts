import { axiosClient } from ".";

export interface IResponseDiscover {
  data: any[];
  pagination: {
    currentPage: number;
    totalPage: number;
  };
}

export interface IParamsDiscover {
  [key: string]: string | number;
}

const moviceService = {
  getDiscover: async (
    params: IParamsDiscover
  ): Promise<IResponseDiscover | undefined> => {
    try {
      const res = await axiosClient.get("/3/discover/movie", { params });
      // api has 40000 page but not accept call page 501
      return {
        data: res.data.results,
        pagination: {
          currentPage: res.data.page,
          totalPage: res.data.total_pages > 500 ? 500 : res.data.total_pages,
        },
      };
    } catch (error) {
    } finally {
    }
  },
};

export { moviceService };
