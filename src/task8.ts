export interface Repository<T extends { id: string }> {
  create(item: T): T;
  findById(id: string): T | undefined;
  update(id: string, changes: Partial<Omit<T, "id">>): T | undefined;
  delete(id: string): boolean;
}

export class MemoryRepository<T extends { id: string }>
  implements Repository<T>
{
  private readonly items = new Map<string, T>();

  create(item: T): T {
    if (this.items.has(item.id)) {
      throw new Error(`Entity with id "${item.id}" already exists`);
    }

    this.items.set(item.id, item);
    return item;
  }

  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  update(id: string, changes: Partial<Omit<T, "id">>): T | undefined {
    const existingItem = this.items.get(id);

    if (existingItem === undefined) {
      return undefined;
    }

    const updatedItem: T = { ...existingItem, ...changes, id: existingItem.id };
    this.items.set(id, updatedItem);
    return updatedItem;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }
}

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

const books = new MemoryRepository<Book>();

console.log("create:", books.create({
  id: "book-1",
  title: "The TypeScript Handbook",
  author: "Microsoft",
  year: 2020,
}));
console.log("find:", books.findById("book-1"));
console.log("update:", books.update("book-1", { year: 2024 }));
console.log("find after update:", books.findById("book-1"));

try {
  books.create({ id: "book-1", title: "Duplicate", author: "Nobody", year: 1999 });
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error: ${error.message}`);
  } else {
    throw error;
  }
}

console.log("find missing:", books.findById("book-404"));
console.log("update missing:", books.update("book-404", { year: 2000 }));
console.log("delete missing:", books.delete("book-404"));
console.log("delete existing:", books.delete("book-1"));
console.log("find after delete:", books.findById("book-1"));
