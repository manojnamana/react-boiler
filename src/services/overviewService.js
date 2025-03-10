import instance from "./api";


export const getUserAnalayticsClaimsSummary = async (user_id) => {
    try {
      
      const url = `/analytics/analytics/claims-summary?user_id=${user_id}`;
      const response = await instance.get(url);
      return response;
    } catch (error) {
      return error.response;
    }
  };