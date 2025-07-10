'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import './globals.css';

// export default function HomePage() {
//   const { user, logout } = useAuth();

//   return (
//     <div>
//       <h1 className="text-4xl font-bold mb-4">Welcome to Our E-Commerce App</h1>
//      <main className="p-10">
//       <h1 className="text-3xl font-bold">Theme Test</h1>
//       <p className="mt-4">
//         This page should be <strong>white with dark blue text</strong> in light mode,
//         and <strong>black with light blue text</strong> in dark mode.
//       </p>
//     </main>

//       {user ? (
//         <>
//           <p className="text-lg mb-6">Hello, {user.email}</p>
//           <button
//             onClick={logout}
//             className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100 font-semibold"
//           >
//             Logout
//           </button>
//         </>
//       ) : (
//         <>
//           <p className="text-lg mb-6">Please log in or sign up to get started.</p>
//           <div className="space-x-4">
//             <Link href="/login">
//               <button className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100 font-semibold">
//                 Login
//               </button>
//             </Link>
//             <Link href="/signup">
//               <button className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100 font-semibold">
//                 Sign Up
//               </button>
//             </Link>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


export default function HomePage() {
  return (
   <div className="bg-green-500 text-white p-6 rounded-xl">
      ✅ Tailwind is working with the correct PostCSS plugin!
    </div>
  );
}