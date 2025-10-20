'use client';

import { useState } from 'react';
import { IUser } from '@/models/IUser';
import { AuthContext } from '@/context/AuthContext';

export default function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: IUser | null;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser | null>(initialUser);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
