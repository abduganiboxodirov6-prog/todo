// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// const API_URL = "http://localhost:7777/maxshulotlar";

// // 1. Mahsulotlarni olish (GET)
// export const useGetProducts = () => {
//   return useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const response = await useFetcher(API_URL);
//       if (!response.ok) throw new Error("Ma'lumotlarni yuklab bo'lmadi");
//       return response.json();
//     },
//     initialData: [],
//   });
// };

// // 2. Mahsulot qo'shish (POST)
// export const useAddProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (newProduct: any) => {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newProduct),
//       });
//       if (!response.ok) throw new Error("Qo'shishda xatolik");
//       return response.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["products"] });
//     },
//   });
// };

// // 3. Mahsulotni o'chirish (DELETE)
// export const useDeleteProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (id: number | string) => {
//       const response = await fetch(${API_URL}/${id}, {
//         method: "DELETE",
//       });
//       if (!response.ok) throw new Error("O'chirishda xatolik");
//       return id;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["products"] });
//     },
//   });
// };