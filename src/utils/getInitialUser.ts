import { cookies } from 'next/headers';

export const getInitialUser = async () => {
  const cookie = await cookies();
  const token = cookie.get('ACCESS_TOKEN')?.value;

  if (!token) return null;

  // Если токен существует - делаем запрос на получение данных пользователя

  return { username: 'fake_username', email: 'fake_email' };
};
