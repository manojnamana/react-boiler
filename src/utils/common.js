export const isNotNullOrEmptyArray = (arr) => {
  return arr && Array.isArray(arr) && arr.length > 0;
};

export const getHomeOverviewImages = () => {
  return [
    "https://assets.minimals.cc/public/assets/images/mock/cover/cover-4.webp",
    "https://assets.minimals.cc/public/assets/images/mock/cover/cover-3.webp",
  ];
};
