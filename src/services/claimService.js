import instance from "./api";

export const createNewClaim = async (title, description, user_id) => {
  try {
    const query_str = `?title=${encodeURIComponent(
      title
    )}&description=${encodeURIComponent(
      description
    )}&user_id=${encodeURIComponent(
      user_id
    )}`;
    const url = `/claims/${query_str}`;
    const response = await instance.post(url);
    return response;
  } catch (error) {
    return error.response;
  }
};



export const getUserClaims = async (user_id) => {
  try {
    
    const url = `/claims/user/${user_id}`;
    const response = await instance.get(url);
    return response;
  } catch (error) {
    return error.response;
  }
};


export const updateUserClaimsStatus = async (claim_id,status) => {
  try {
    const query_str = `new_status=${encodeURIComponent(status)}`
    const url = `/claims/${claim_id}/status?${query_str}`;
    const response = await instance.patch(url);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getClaimDetails = async (claim_id) => {
  try {
    const url = `/claims/${claim_id}`;
    const response = await instance.get(url);
    return response;
  } catch (error) {
    return error.response;
  }
};



export const postClaimFeedBack = async (claim_id,feedBack) => {
  try {
    const url = `/claims/${claim_id}/feedback`;
    const response = await instance.post(url,{feedback_text:feedBack});
    return response;
  } catch (error) {
    return error.response;
  }
};

