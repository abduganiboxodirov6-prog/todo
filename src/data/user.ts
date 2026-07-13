// Interfeysni to'g'ri belgilash ({} qavslar bilan)
interface User {
  id: number;
  name: string;
  age: number;
  city: string;
}

// 10 ta foydalanuvchidan iborat massiv
const users: User[] = [
  { id: 1, name: "Ali Valiyev", age: 25, city: "Toshkent" },
  { id: 2, name: "Madina Karimova", age: 22, city: "Samarqand" },
  { id: 3, name: "Jasur Ahmedov", age: 30, city: "Buxoro" },
  { id: 4, name: "Dilnoza Aliyeva", age: 28, city: "Farg'ona" },
  { id: 5, name: "Azizbek Rahimov", age: 35, city: "Navoiy" },
  { id: 6, name: "Sabina Yusupova", age: 24, city: "Xiva" },
  { id: 7, name: "Behruz Saidov", age: 29, city: "Namangan" },
  { id: 8, name: "Zuhra Tursunova", age: 27, city: "Andijon" },
  { id: 9, name: "Rustam Ikromov", age: 32, city: "Termiz" },
  { id: 10, name: "Kamola Yo'ldosheva", age: 26, city: "Qarshi" },
];

export default users;