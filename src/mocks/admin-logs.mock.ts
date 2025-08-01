import { AdminLog } from "src/types/admin-logs";

export const adminLogsMock: AdminLog[] = [
  {
    id: "1",
    userId: "1",
    action: "CREATE",
    entity: "User",
    entityId: "2",
    oldData: null,
    newData: {
      email: "john.doe@example.com",
      displayName: "John Doe",
      role: "user",
      active: true,
    },
    description: "Created new user John Doe",
    createdAt: "2025-01-20T10:30:00Z",
  },
  {
    id: "2",
    userId: "1",
    action: "UPDATE",
    entity: "Rule",
    entityId: "1122334455",
    oldData: {
      name: "Old Rule Name",
      status: "inactive",
    },
    newData: {
      name: "Sample Rule 3",
      status: "active",
    },
    description: "Updated rule status and name",
    createdAt: "2025-01-20T14:15:00Z",
  },
  {
    id: "3",
    userId: "7",
    action: "DELETE",
    entity: "ConversionRate",
    entityId: "conv-123",
    oldData: {
      name: "Old Rate",
      rate: 1.5,
      status: "active",
    },
    newData: null,
    description: "Deleted conversion rate",
  },
  {
    id: "4",
    userId: "1",
    action: "CREATE",
    entity: "Variable",
    entityId: "var-456",
    oldData: null,
    newData: {
      name: "user_level",
      valueType: "number",
      inputType: "select",
    },
    description: "Created new variable user_level",
  },
  {
    id: "5",
    userId: "7",
    action: "UPDATE",
    entity: "User",
    entityId: "4",
    oldData: {
      active: true,
    },
    newData: {
      active: false,
    },
    description: "Deactivated user Bob Wilson",
  },
  {
    id: "6",
    userId: "1",
    action: "CREATE",
    entity: "Rule",
    entityId: "2233445566",
    oldData: null,
    newData: {
      name: "Sample Rule 4",
      status: "inactive",
      effect: { type: "multiply", value: 2 },
    },
    description: "Created new rule Sample Rule 4",
  },
  {
    id: "7",
    userId: "10",
    action: "UPDATE",
    entity: "ConversionRate",
    entityId: "conv-789",
    oldData: {
      rate: 2.0,
      status: "inactive",
    },
    newData: {
      rate: 2.5,
      status: "active",
    },
    description: "Updated conversion rate and activated it",
  },
  {
    id: "8",
    userId: "1",
    action: "DELETE",
    entity: "Variable",
    entityId: "var-old",
    oldData: {
      name: "old_variable",
      valueType: "string",
      inputType: "text",
    },
    newData: null,
    description: "Deleted obsolete variable old_variable",
  },
];
