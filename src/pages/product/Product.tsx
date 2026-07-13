import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { schema } from "./Product";

export default function ProductForm() {
  const queryClient = useQueryClient();


  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:7777/products");
      return res.json();
    },
  });


  const mutation = useMutation({
    mutationFn: async (newProduct) => {
      const res = await fetch("http://localhost:7777/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newProduct, id: Date.now() }), // ID qo'shildi
      });
      if (!res.ok) throw new Error("Server xatosi!");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  // 3. DELETE (Yangi qo'shildi)
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await fetch(`http://localhost:7777/products/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
    reset();
  };

  const inputClass =
    "w-full bg-black/40 border border-cyan-500/30 text-cyan-100 placeholder-cyan-500/50 rounded-lg px-4 py-3 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all backdrop-blur-sm";
  const errorClass = "text-pink-500 text-[10px] mt-1 italic";

  return (
    <div className="min-h-screen bg-[#050505] p-6 flex flex-col md:flex-row gap-8 justify-center items-start text-white">
      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-black/20 backdrop-blur-xl border border-fuchsia-500/30 p-8 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.1)]"
      >
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-6 text-center tracking-tighter">
          YANGI MAHSULOT
        </h2>
        {/* ... input qismlari avvalgidek ... */}
        <div className="space-y-4">
          <select {...register("kategoriya")} className={inputClass}>
            <option value="" className="bg-gray-900">
              Kategoriyani tanlang
            </option>
            <option value="Kiyimlar" className="bg-gray-900">
              Kiyimlar
            </option>
            <option value="Oziq-ovqat" className="bg-gray-900">
              Oziq-ovqat
            </option>
          </select>
          <input
            {...register("nomi")}
            placeholder="Mahsulot nomi"
            className={inputClass}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              {...register("narxi")}
              placeholder="Narxi ($)"
              className={inputClass}
            />
            <input
              type="number"
              {...register("miqdor")}
              placeholder="Miqdor"
              className={inputClass}
            />
          </div>
          <textarea
            {...register("description")}
            placeholder="Tavsif..."
            className={`${inputClass} h-20 resize-none`}
          />
        </div>
        <button
          disabled={mutation.isPending}
          className="w-full mt-6 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-lg font-bold text-white uppercase tracking-widest transition-all hover:opacity-90"
        >
          {mutation.isPending ? "SAQLANMOQDA..." : "SAQLASH"}
        </button>
      </form>

      {/* CARD LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="relative w-64 bg-black/40 border border-cyan-500/20 p-5 rounded-xl hover:border-cyan-500/60 transition-colors backdrop-blur-md group"
          >
            {/* O'CHIRISH TUGMASI */}
            <button
              onClick={() => deleteMutation.mutate(p.id)}
              className="absolute top-2 right-2 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
            >
              ✕
            </button>

            <h3 className="text-cyan-400 font-bold uppercase tracking-wider">
              {p.nomi}
            </h3>
            <p className="text-[10px] text-fuchsia-400 mb-3">{p.kategoriya}</p>
            <div className="text-sm border-t border-white/5 pt-3">
              <p className="flex justify-between">
                Narxi: <span>{p.narxi} $</span>
              </p>
              <p className="flex justify-between">
                Miqdor: <span>{p.miqdor} ta</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
