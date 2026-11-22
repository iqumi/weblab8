export type UserId = string & { readonly brand: unique symbol };

export interface UserProfile {
  id: UserId;
  displayName: string;
  role: string;
}

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUserId(value: unknown): value is UserId {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

function getUserProfile(id: UserId): UserProfile {
  return {
    id,
    displayName: "Demo User",
    role: "student",
  };
}

function describeProfileLookup(value: unknown): void {
  if (isUserId(value)) {
    console.log("Profile found:", getUserProfile(value));
  } else {
    console.log(`Not a valid UserId: ${JSON.stringify(value)}`);
  }
}

describeProfileLookup("123e4567-e89b-12d3-a456-426614174000");
describeProfileLookup("not-a-uuid");
describeProfileLookup(12345);
describeProfileLookup(null);
