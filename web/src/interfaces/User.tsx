import { Category } from "./Categories";

export interface UserData {
    name: string;
    email: string;
    createdAt: string;
    id: string;
    categories: Category[];
  }