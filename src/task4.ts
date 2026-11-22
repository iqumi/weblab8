export function addTag(tags: readonly string[], tag: string): string[] {
  return tags.includes(tag) ? [...tags] : [...tags, tag];
}

export function removeTag(tags: readonly string[], tag: string): string[] {
  return tags.filter((existingTag) => existingTag !== tag);
}

export function mergeTags(
  firstTags: readonly string[],
  secondTags: readonly string[],
): string[] {
  return [...new Set([...firstTags, ...secondTags])];
}

const originalTags: readonly string[] = ["ts", "node", "ts", "Node"];
const extraTags: readonly string[] = ["node", "npm", "ts", "types"];

console.log("original:", originalTags);
console.log("addTag existing:", addTag(originalTags, "node"));
console.log("addTag new:", addTag(originalTags, "esm"));
console.log("removeTag:", removeTag(originalTags, "ts"));
console.log("mergeTags:", mergeTags(originalTags, extraTags));
console.log("original after operations:", originalTags);
console.log("extra after operations:", extraTags);
