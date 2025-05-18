import { create } from "zustand";

export type Password = {
  id: string;
  title: string;
  username: string;
  password: string;
  serviceUrl?: string;
  description?: string;
  groupId: string | null;
};

export type Group = {
  id: string;
  name: string;
};

export type PasswordStore = {
  passwordsList: Password[];
  groups: Group[];
  selectedGroupId: string | null;
  selectedPasswordId: string | null;
  searchQuery: string;
  passwords: () => Password[];
  selectedPassword: () => Password | null;
  addPassword: (password: Omit<Password, "id">) => string;
  updatePassword: (password: Password) => void;
  deletePassword: (passwordId: string) => void;
  setSelectedGroup: (val: string | null) => void;
  setSelectedPassword: (val: string | null) => void;
  setSearchQuery: (query: string) => void;
  movePasswordToGroup: (
    passwordId: string,
    targetGroupId: string | null
  ) => void;
  addGroup: (name: string) => void;
  deleteGroup: (groupId: string) => void;
};

export const usePasswordStore = create<PasswordStore>((set, get) => ({
  passwordsList: [
    {
      id: "1",
      title: "Gmail",
      username: "user@firma.com",
      password: "123",
      groupId: "work",
    },
    {
      id: "2",
      title: "Facebook",
      username: "me@fb.com",
      password: "abc",
      groupId: "personal",
    },
    {
      id: "3",
      title: "Nezařazené heslo",
      username: "no@group.com",
      password: "xyz",
      groupId: null,
    },
  ],
  groups: [
    { id: "work", name: "Práce" },
    { id: "personal", name: "Osobní" },
  ],
  selectedGroupId: null,
  selectedPasswordId: null,
  searchQuery: "",

  passwords: () => {
    const { passwordsList, selectedGroupId, searchQuery } = get();
    const lowerQuery = searchQuery.toLowerCase();

    return passwordsList.filter((p) => {
      const matchesGroup =
        selectedGroupId === null || p.groupId === selectedGroupId;
      const matchesSearch = p.title.toLowerCase().includes(lowerQuery);
      return matchesGroup && matchesSearch;
    });
  },

  selectedPassword: () => {
    const { passwordsList, selectedPasswordId } = get();
    return passwordsList.find((p) => p.id === selectedPasswordId) ?? null;
  },
  addPassword: (password) => {
    const id = crypto.randomUUID();
    set((state) => ({
      passwordsList: [
        ...state.passwordsList,
        {
          ...password,
          id: id,
        },
      ],
    }));
    return id;
  },
  updatePassword: (updatedPassword: Password) => {
    set((state) => ({
      passwordsList: state.passwordsList.map((p) =>
        p.id === updatedPassword.id ? updatedPassword : p
      ),
    }));
  },
  deletePassword: (passwordId) =>
    set((state) => ({
      passwordsList: state.passwordsList.filter((p) => p.id !== passwordId),
      // reset výběru, pokud zrovna mažeš vybraný
      selectedPasswordId:
        state.selectedPasswordId === passwordId
          ? null
          : state.selectedPasswordId,
    })),
  setSelectedGroup: (val) => {
    set({
      selectedGroupId: val,
      selectedPasswordId: null,
    });
  },

  setSelectedPassword: (val) => set({ selectedPasswordId: val }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  movePasswordToGroup: (passwordId, targetGroupId) => {
    set((state) => ({
      passwordsList: state.passwordsList.map((p) =>
        p.id === passwordId ? { ...p, groupId: targetGroupId } : p
      ),
    }));
  },

  addGroup: (name) =>
    set((state) => ({
      groups: [
        ...state.groups,
        {
          id: crypto.randomUUID(),
          name,
        },
      ],
    })),
  deleteGroup: (groupId: string) =>
    set((state) => ({
      groups: state.groups.filter((g) => g.id !== groupId),
      passwordsList: state.passwordsList.map((p) =>
        p.groupId === groupId ? { ...p, groupId: null } : p
      ),
      selectedGroupId:
        state.selectedGroupId === groupId ? null : state.selectedGroupId,
    })),
}));
