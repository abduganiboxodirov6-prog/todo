import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "./Login";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log("Login ma'lumotlari:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full max-w-md p-8 bg-gray-900 border border-purple-500/30 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.3)]"
      >
        {/* Neon effektlari */}
        <div className="absolute inset-0 rounded-2xl border border-pink-500/20 pointer-events-none"></div>
        
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 text-center">
          Tizimga Kirish
        </h2>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2">Email</label>
          <input
            {...register("email")}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            placeholder="example@mail.com"
          />
          {errors.email && <p className="text-pink-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Parol */}
        <div className="mb-8">
          <label className="block text-gray-400 text-sm mb-2">Parol</label>
          <input
            {...register("password")}
            type="password"
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-pink-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        {/* Tugma */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(219,39,119,0.5)] transition-all transform hover:scale-[1.02]"
        >
          Kirish
        </button>
      </form>
    </div>
  );
}

export default Login;