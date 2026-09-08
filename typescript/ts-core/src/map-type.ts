type MappedType<T> = {
  readonly [K in keyof T]: T[K];
};

interface newUser {
  id: number;
  name: string;
}

type readonlyUser = MappedType<newUser>;
