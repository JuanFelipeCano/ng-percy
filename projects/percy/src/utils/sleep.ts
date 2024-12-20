export const sleep = (timeout: number) => new Promise(resolve => setTimeout(() => resolve(true), timeout));
