import { Tasks } from "./Tasks";

export interface Category {
  name: string;
  id: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  tasks: Tasks[] | []
}
