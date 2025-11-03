import type { Database } from "./types";

export type Tables = Database["public"]["Tables"];

export type User = Tables["User"]["Row"];
export type Chat = Tables["Chat"]["Row"];
export type ChatInsert = Tables["Chat"]["Insert"];
export type ChatUpdate = Tables["Chat"]["Update"];
export type DBMessage = Tables["Message_v2"]["Row"];
export type DBMessageInsert = Tables["Message_v2"]["Insert"];
export type DBMessageUpdate = Tables["Message_v2"]["Update"];
export type Vote = Tables["Vote_v2"]["Row"];
export type VoteInsert = Tables["Vote_v2"]["Insert"];
type DocumentTable = Tables["Document"];

export type Document = Omit<DocumentTable["Row"], "text"> & {
  kind: DocumentTable["Row"]["text"];
};

export type DocumentInsert = Omit<DocumentTable["Insert"], "text"> & {
  kind: DocumentTable["Insert"]["text"];
};

export type DocumentUpdate = Omit<DocumentTable["Update"], "text"> & {
  kind?: DocumentTable["Update"]["text"];
};
export type Suggestion = Tables["Suggestion"]["Row"];
export type SuggestionInsert = Tables["Suggestion"]["Insert"];
export type Stream = Tables["Stream"]["Row"];
export type StreamInsert = Tables["Stream"]["Insert"];

export type Functions = Database["public"]["Functions"];
