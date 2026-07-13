import users from "../../data/user";


function Home() {
 return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Foydalanuvchilar ro&apos;yxati
      </h1>

      {/* Userlarni map qilib card korinishda chiqarish */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.city}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-gray-600">
                Yosh: <span className="font-semibold text-gray-900">{user.age}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home
