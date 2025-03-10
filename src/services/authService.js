import instance from "./api";

export const login = async (identifier, password) => {
  try {
    const query_str = `?username_or_email=${encodeURIComponent(
      identifier
    )}&password=${encodeURIComponent(password)}`;
    const url = `/auth/login${query_str}`;
    const response = await instance.post(url);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const register = async (
  username,
  email,
  phone_number,
  name,
  password
) => {
  const query_str = `?username=${encodeURIComponent(
    username
  )}&email=${encodeURIComponent(email)}&phone_number=${encodeURIComponent(
    phone_number
  )}&name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`;
  try {
    const url = `/auth/signup${query_str}`;
    const response = await instance.post(url);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const confirmRegistration = async (username, confirmation_code) => {
  try {
    const query_str = `?username=${encodeURIComponent(
      username
    )}&confirmation_code=${encodeURIComponent(confirmation_code)}`;
    const url = `/auth/confirm${query_str}`;
    const response = await instance.post(url);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const resetPassword = async (username) => {
  try {
    const query_str = `?username=${encodeURIComponent(username)}`;
    const url = `/auth/password-reset${query_str}`;
    const response = await instance.post(url);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const confirmResetPassword = async (
  username,
  confirmation_code,
  password
) => {
  try {
    const query_str = `?username=${encodeURIComponent(
      username
    )}&confirmation_code=${encodeURIComponent(
      confirmation_code
    )}&set_password=${encodeURIComponent(password)}`;
    const url = `/auth/password-reset-verify${query_str}`;
    const response = await instance.post(url);
    return response;
  } catch (error) {
    return error.response;
  }
};
