'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import LoginForm from './_components/loginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-cover bg-center" style={{ backgroundImage: "url('/images/home/hero-background.jpg')" }}>
      <Header />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-black bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-md">
          <LoginForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}