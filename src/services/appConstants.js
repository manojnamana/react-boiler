let BACKEND_URL = "https://backend.bakerstreetsolutions.org/api";
if (process.env.NODE_ENV === "production") {
  // TODO: Update the production URL
  BACKEND_URL = "https://backend.bakerstreetsolutions.org/api";
}

export { BACKEND_URL };
