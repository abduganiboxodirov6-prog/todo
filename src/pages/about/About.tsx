import { useState, type ChangeEvent, type SubmitEvent } from "react";

interface Product {
  id: number;
  maxsulot_nomi: string;
  narxi: string;
}

function ProductForm() {
  const [maxsulot, setMaxsulot] = useState({
    maxsulot_nomi: "",
    narxi: "",
  });

  const [products, setProducts] = useState<Product[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMaxsulot((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (maxsulot.maxsulot_nomi.trim() && maxsulot.narxi.trim()) {
      // Yangi element uchun unik ID yaratamiz (vaqt bo'yicha)
      const newProduct: Product = {
        id: Date.now(),
        ...maxsulot,
      };
      setProducts((prev) => [...prev, newProduct]);
      setMaxsulot({ maxsulot_nomi: "", narxi: "" });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Yangi Mahsulot</h2>

        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-2">Maxsulot</label>
          <input
            type="text"
            placeholder="Maxsulot nomi"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            name="maxsulot_nomi"
            value={maxsulot.maxsulot_nomi}
            onChange={handleChange}
            required // HTML5 validatsiyasi
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 text-sm mb-2">Narxi</label>
          <input
            type="number"
            placeholder="Narxi"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            name="narxi"
            value={maxsulot.narxi}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
        >
          Saqlash
        </button>
      </form>

      {products.length > 0 && (
        <div className="w-full max-w-sm overflow-hidden rounded-lg border border-gray-700">
          <table className="w-full text-left text-white bg-gray-800">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2">Nomi</th>
                <th className="px-4 py-2">Narxi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="border-t border-gray-700">
                  <td className="px-4 py-2">{item.maxsulot_nomi}</td>
                  <td className="px-4 py-2">{item.narxi} so'm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductForm;