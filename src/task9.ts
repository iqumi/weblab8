export type DeepReadonly<T> = T extends readonly (infer Item)[]
  ? ReadonlyArray<DeepReadonly<Item>>
  : T extends object
    ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
    : T;

export function deepFreeze<T>(obj: T): DeepReadonly<T> {
  if (typeof obj === "object" && obj !== null && !Object.isFrozen(obj)) {
    Object.values(obj).forEach(deepFreeze);
    Object.freeze(obj);
  }

  return obj as DeepReadonly<T>;
}

const config = deepFreeze({
  appName: "lab-8",
  server: {
    host: "localhost",
    ports: [3000, 3001],
    limits: { requests: 100 },
  },
  users: [
    { id: 1, name: "Alice", tags: ["admin"] },
    { id: 2, name: "Bob", tags: [] as string[] },
  ],
  note: null,
});

console.log("config frozen:", Object.isFrozen(config));
console.log("server frozen:", Object.isFrozen(config.server));
console.log("limits frozen:", Object.isFrozen(config.server.limits));
console.log("ports frozen:", Object.isFrozen(config.server.ports));
console.log("users frozen:", Object.isFrozen(config.users));
console.log("first user frozen:", Object.isFrozen(config.users[0]));
console.log("first user tags frozen:", Object.isFrozen(config.users[0]?.tags));

// config.appName = "other";
// Compile error: "appName" is a read-only property.

// config.server.limits.requests = 1;
// Compile error: nested property "requests" is read-only too.

// config.server.ports.push(4000);
// Compile error: ReadonlyArray has no "push" method.

// config.users[0].name = "Eve";
// Compile error: array elements are deeply read-only.
