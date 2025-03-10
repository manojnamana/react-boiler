import instance from "./api";



export const getUserOrganisation = async (user_id) => {
    try {
      const url = `/organizations/user/${user_id}/organization`;
      const response = await instance.get(url);
      console.log(response.status)
      return response
    } catch (error) {
  
      return error.response?.data.detail
    }
  };
  


export const createOrganisation = async (name, user_id,address,description) => {
    try {
      const query_str = `?name=${encodeURIComponent(
        name
      )}
    &user_id=${encodeURIComponent(
        user_id
      )}&address=${encodeURIComponent(
        address
      )}&description=${encodeURIComponent(
        description
      )}` ;
      const url = `/organizations/${query_str}`;
      const response = await instance.post(url);
      return response;
    } catch (error) {
      return error.response;
    }
  };


  export const AddUsers = async ( user_id,org_id) => {
    try {
      const query_str = `?
    &user_id=${encodeURIComponent(
        user_id
      )}&org_id=${encodeURIComponent(
        org_id
      )}` ;
      const url = `/users/assign-organization/${query_str}`;
      const response = await instance.post(url);
      return response;
    } catch (error) {
      return error.response;
    }
  };