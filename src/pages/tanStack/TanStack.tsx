import { useState, type FC, type InputHTMLAttributes } from "react";
import { useUsers, type NewUser, type User } from "./useUser";

// ---------- Qayta ishlatiluvchi Neon Input ----------
interface NeonInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const NeonInput: FC<NeonInputProps> = ({ label, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-wider text-cyan-400/80">
      {label}
    </label>
    <input
      {...props}
      className="bg-black/60 border border-cyan-500/30 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500
                 outline-none transition-all duration-200
                 focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(34,211,238,0.5)]
                 hover:border-cyan-500/60"
    />
  </div>
);

// ---------- Asosiy komponent ----------
function UsersPage() {
  const { query, create, update, remove } = useUsers();
  const { data: users, isLoading, isError, error } = query;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  // ---------- POST ----------
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as unknown as NewUser;

    create.mutate(data, {
      onSuccess: () => form.reset(), // Formani tozalash
    });
  };

  // ---------- Modal ----------
  const openEditModal = (user: User) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditUser(null);
  };

  // ---------- PUT ----------
  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    update.mutate(editUser, { onSuccess: closeEditModal });
  };

  // ---------- DELETE ----------
  const handleDelete = (id: number | string) => {
    if (window.confirm("Haqiqatan ham ushbu userni o'chirmoqchimisiz?")) {
      remove.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.12),_transparent_60%)] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-10 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 drop-shadow-[0_0_20px_rgba(217,70,239,0.35)]">
            Userlarni boshqarish
          </span>
        </h1>

        {/* ---------- Qo'shish formasi ---------- */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mb-10 p-6 bg-slate-900/70 border border-fuchsia-500/20 rounded-2xl"
        >
          <NeonInput name="name" label="Ism" type="text" required />
          <NeonInput name="email" label="Email" type="email" required />
          <NeonInput name="phone" label="Telefon" type="text" required />

          <button
            type="submit"
            disabled={create.isPending}
            className="sm:col-span-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-lg py-2.5
                       font-semibold hover:from-cyan-400 hover:to-fuchsia-400 disabled:opacity-40
                       shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all"
          >
            {create.isPending ? "Qo'shilmoqda..." : "+ Qo'shish"}
          </button>
        </form>

        {/* ---------- Jadval ---------- */}
        <div className="bg-slate-900/70 backdrop-blur border border-cyan-500/20 rounded-2xl
                        shadow-[0_0_25px_rgba(34,211,238,0.12)] overflow-hidden">
          {isLoading && (
            <p className="p-6 text-center text-cyan-300 animate-pulse">Yuklanmoqda...</p>
          )}

          {isError && (
            <p className="p-6 text-center text-rose-400">{(error as Error).message}</p>
          )}

          {!isLoading && !isError && (
            <table className="w-full text-left">
              <thead className="bg-black/50 text-cyan-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Ism</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Telefon</th>
                  <th className="px-6 py-3 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-cyan-500/5 transition-colors">
                      <td className="px-6 py-3 text-slate-100 font-medium">{user.name}</td>
                      <td className="px-6 py-3 text-slate-400">{user.email}</td>
                      <td className="px-6 py-3 text-slate-400">{user.phone}</td>
                      <td className="px-6 py-3 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="border border-amber-400/50 text-amber-300 hover:bg-amber-400/10
                                     hover:shadow-[0_0_10px_rgba(251,191,36,0.4)]
                                     px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                        >
                          Tahrirlash
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          disabled={remove.isPending}
                          className="border border-rose-500/50 text-rose-300 hover:bg-rose-500/10
                                     hover:shadow-[0_0_10px_rgba(244,63,94,0.4)]
                                     px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
                        >
                          O&apos;chirish
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-6 text-center text-slate-500">
                      Hozircha userlar mavjud emas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ---------- Tahrirlash modali ---------- */}
      {isModalOpen && editUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-slate-900 border border-fuchsia-500/40 rounded-2xl
                       shadow-[0_0_40px_rgba(217,70,239,0.35)] w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              Userni tahrirlash
            </h2>

            <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-4">
              <NeonInput
                label="Ism"
                type="text"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                required
              />
              <NeonInput
                label="Email"
                type="email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                required
              />
              <NeonInput
                label="Telefon"
                type="text"
                value={editUser.phone}
                onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                required
              />

              {update.isError && (
                <p className="text-sm text-rose-400">{(update.error as Error).message}</p>
              )}

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 rounded-lg text-slate-400 border border-slate-700 hover:bg-slate-800 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={update.isPending}
                  className="px-4 py-2 rounded-lg text-white font-semibold
                             bg-gradient-to-r from-cyan-500 to-fuchsia-500
                             hover:from-cyan-400 hover:to-fuchsia-400 disabled:opacity-40
                             shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all"
                >
                  {update.isPending ? "Saqlanmoqda..." : "Saqlash"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;