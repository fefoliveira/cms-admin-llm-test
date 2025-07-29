import { create } from "zustand";

import axios, { endpoints } from "src/utils/axios";
import { usersMock } from "src/mocks";

import { User, UserState, UserUpdatePayload } from "src/types/user";

type Actions = {
  setOrder: (order: "desc" | "asc") => void;
  setOrderBy: (orderBy: string) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setDense: (dense: boolean) => void;
  setNewConditionToggle: (newConditionToggle: boolean) => void;
  setLoading: (loading: boolean) => void;
  fetchUsers: () => Promise<void>;
  findUserById: (id: string) => Promise<User>;
  createUser: (user: UserUpdatePayload) => Promise<void>;
  updateUser: (id: string, updatedUser: UserUpdatePayload) => Promise<void>;
  inactivateUser: (id: string) => Promise<void>;
};

const initialValues: UserState = {
  users: [
    {
      id: "",
      email: "",
      displayName: "",
      role: "admin",
      active: false,
    },
  ],
  loading: false,
  error: null,
  order: "desc",
  orderBy: "createdAt",
  page: 0,
  rowsPerPage: 5,
  dense: false,
  newConditionToggle: false,
};

export const useUserStore = create<UserState & Actions>((set) => ({
  ...initialValues,

  setOrder: (order: "desc" | "asc") => set({ order }),

  setOrderBy: (orderBy: string) => set({ orderBy }),

  setPage: (page: number) => set({ page }),

  setRowsPerPage: (rowsPerPage: number) => set({ rowsPerPage }),

  setDense: (dense: boolean) => set({ dense }),

  setNewConditionToggle: (newConditionToggle: boolean) =>
    set({ newConditionToggle }),

  setLoading: (loading: boolean) => set({ loading }),

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(endpoints.adminUser.getAll);
      set({ users: response.data.admin_users || usersMock, loading: false });
    } catch (error) {
      console.warn("API request failed, using mock data:", error);
      set({ users: usersMock, loading: false, error: null });
    }
  },

  findUserById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${endpoints.adminUser.getById}/${id}`);
      set({ loading: false });
      return response.data.adminuser;
    } catch (error) {
      console.warn("API request failed, using mock data:", error);
      const mockUser = usersMock.find((user) => user.id === id);
      set({ loading: false, error: null });
      if (mockUser) {
        return mockUser;
      }
      throw new Error("User not found");
    }
  },

  createUser: async (user: UserUpdatePayload) => {
    set({ loading: true, error: null });
    try {
      await axios.post(endpoints.adminUser.create, user);
      await useUserStore.getState().fetchUsers();
      set({ loading: false });
    } catch (error) {
      console.warn("API request failed, simulating with mock data:", error);
      // Simulate creation with mock data
      const newUser: User = {
        ...user,
        id: Math.random().toString(36).substr(2, 9),
        active: user.active ?? true,
      };
      const state = useUserStore.getState();
      set({
        users: [...state.users, newUser],
        loading: false,
        error: null,
      });
    }
  },

  updateUser: async (id: string, updatedUser: UserUpdatePayload) => {
    set({ loading: true, error: null });
    try {
      await axios.put(`${endpoints.adminUser.update}/${id}`, updatedUser);
      await useUserStore.getState().fetchUsers();
      set({ loading: false });
    } catch (error) {
      console.warn("API request failed, simulating with mock data:", error);
      // Simulate update with mock data
      const state = useUserStore.getState();
      set({
        users: state.users.map((u) =>
          u.id === id ? { ...u, ...updatedUser } : u
        ),
        loading: false,
        error: null,
      });
    }
  },

  inactivateUser: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await axios.put(`${endpoints.adminUser.inactivate}/${id}`);
      await useUserStore.getState().fetchUsers();
      set({ loading: false });
    } catch (error) {
      console.warn("API request failed, simulating with mock data:", error);
      // Simulate inactivation with mock data
      const state = useUserStore.getState();
      set({
        users: state.users.map((u) =>
          u.id === id ? { ...u, active: false } : u
        ),
        loading: false,
        error: null,
      });
    }
  },
}));
