export const sleep = (ms: number) => {
  const timeoutId = new Promise((resolve) => setTimeout(resolve, ms));

  return timeoutId;
};
