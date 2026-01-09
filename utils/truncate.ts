export const truncate = (str: string, limit: number): string =>
    str.length <= limit
      ? str
      : `${str.slice(0, limit - 6)}...${str.slice(-3)}`;
