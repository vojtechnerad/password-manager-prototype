import { create } from "zustand";

export type Password = {
  id: string;
  title: string;
  username: string;
  password: string;
};

export type Group = {
  id: string;
  name: string;
  passwords: Password[];
};

export type PasswordStore = {
  groups: Group[];
  selectedGroupId: string | null;
  selectedPasswordId: string | null;
  selectedPassword: () => Password | null;
  passwords: () => Password[];
  setSelectedGroup: (val: string | null) => void;
  setSelectedPassword: (val: string | null) => void;
  movePasswordToGroup: (passwordId: string, targetGroupId: string) => void;
  addGroup: (name: string) => void;
};

export const usePasswordStore = create<PasswordStore>((set, get) => ({
  groups: [
    {
      id: "work",
      name: "Práce",
      passwords: [
        {
          id: "1",
          title: "Gmail",
          username: "user@firma.com",
          password: "123",
        },
      ],
    },
    {
      id: "personal",
      name: "Osobní",
      passwords: [
        { id: "2", title: "Facebook", username: "me@fb.com", password: "abc" },
      ],
    },
  ],
  selectedGroupId: null,
  selectedPasswordId: null,
  passwords: () => {
    const { groups, selectedGroupId } = get();

    if (selectedGroupId) {
      const group = groups.find((g) => g.id === selectedGroupId);
      return group?.passwords ?? [];
    }

    // Sloučit všechna hesla ze všech skupin
    return groups.flatMap((g) => g.passwords);
  },
  selectedPassword: () => {
    const { groups, selectedGroupId, selectedPasswordId } = get();
    if (!selectedPasswordId) return null;

    if (selectedGroupId) {
      const group = groups.find((g) => g.id === selectedGroupId);
      return group?.passwords.find((p) => p.id === selectedPasswordId) ?? null;
    }

    for (const group of groups) {
      const match = group.passwords.find((p) => p.id === selectedPasswordId);
      if (match) return match;
    }

    return null;
  },
  setSelectedGroup: (val) => {
    set({
      selectedGroupId: val,
      selectedPasswordId: null,
    });
  },
  setSelectedPassword: (val) => set({ selectedPasswordId: val }),
  movePasswordToGroup: (passwordId, targetGroupId) => {
    const { groups } = get();

    let passwordToMove: Password | null = null;
    const newGroups = groups.map((group) => {
      const newPasswords = group.passwords.filter((p) => {
        if (p.id === passwordId) {
          passwordToMove = p;
          return false;
        }
        return true;
      });
      return { ...group, passwords: newPasswords };
    });

    if (passwordToMove) {
      const targetGroup = newGroups.find((g) => g.id === targetGroupId);
      if (targetGroup) {
        targetGroup.passwords.push(passwordToMove);
      }
    }

    set({ groups: newGroups });
  },
  addGroup: (name) =>
    set((state) => ({
      groups: [
        ...state.groups,
        {
          id: crypto.randomUUID(), // nebo jiný generátor ID
          name,
          passwords: [],
        },
      ],
    })),
}));
