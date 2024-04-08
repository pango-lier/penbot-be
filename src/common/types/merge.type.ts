export type Merge<T, K> = Partial<Omit<T, keyof K> & K>;
