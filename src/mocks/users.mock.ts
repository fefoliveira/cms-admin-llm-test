import { User } from "src/types/user";

export const usersMock: User[] = [
  {
    id: "1",
    email: "admin@pointforge.com",
    displayName: "Administrator",
    role: "admin",
    active: true,
  },
  {
    id: "2",
    email: "john.doe@example.com",
    displayName: "John Doe",
    role: "user",
    active: true,
  },
  {
    id: "3",
    email: "jane.smith@example.com",
    displayName: "Jane Smith",
    role: "user",
    active: true,
  },
  {
    id: "4",
    email: "bob.wilson@example.com",
    displayName: "Bob Wilson",
    role: "admin",
    active: false,
  },
  {
    id: "5",
    email: "alice.johnson@example.com",
    displayName: "Alice Johnson",
    role: "user",
    active: true,
  },
  {
    id: "6",
    email: "mike.brown@example.com",
    displayName: "Mike Brown",
    role: "user",
    active: false,
  },
  {
    id: "7",
    email: "sarah.davis@example.com",
    displayName: "Sarah Davis",
    role: "admin",
    active: true,
  },
  {
    id: "8",
    email: "tom.miller@example.com",
    displayName: "Tom Miller",
    role: "user",
    active: true,
  },
  {
    id: "9",
    email: "lisa.garcia@example.com",
    displayName: "Lisa Garcia",
    role: "user",
    active: false,
  },
  {
    id: "10",
    email: "david.rodriguez@example.com",
    displayName: "David Rodriguez",
    role: "admin",
    active: true,
  },
];
