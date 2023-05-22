export interface Entry {
  _id: string;
  description: string;
  createAt: string;
  createdBy: string;
  completedBy: string;
  status: EntryStatus;
}

export type EntryStatus = "pending" | "in-progres" | "finished"