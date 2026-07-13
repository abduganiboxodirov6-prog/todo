import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:7777/users";

// ---------- Turlar ----------
export interface User {
  id: number | string;
  name: string;
  email: string;
  phone: string;
}

export type NewUser = Omit<User, "id">;

// ---------- API funksiyalari ----------
const getUsers = async (): Promise<User[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Userlarni olishda xatolik yuz berdi");
  return res.json();
};

const createUser = async (user: NewUser): Promise<User> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("User qo'shishda xatolik yuz berdi");
  return res.json();
};

const updateUser = async (user: User): Promise<User> => {
  const res = await fetch(`${API_URL}/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("User tahrirlashda xatolik yuz berdi");
  return res.json();
};

const deleteUser = async (id: number | string): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("User o'chirishda xatolik yuz berdi");
};

// ---------- Hook ----------
export const useUsers = () => {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["users"] });

  const query = useQuery({ queryKey: ["users"], queryFn: getUsers });
  const create = useMutation({ mutationFn: createUser, onSuccess: invalidate });
  const update = useMutation({ mutationFn: updateUser, onSuccess: invalidate });
  const remove = useMutation({ mutationFn: deleteUser, onSuccess: invalidate });

  return { query, create, update, remove };
};