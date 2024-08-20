// ProfilePage.tsx (Server Component)
import Profile from '@/components/Client/profile';
import { cookies } from 'next/headers';

export default async function ProfilePage() {
  const cookieStore = cookies();
  const authToken = cookieStore.get('authToken')?.value;

  if (!authToken) {
    return <div>You are not authenticated</div>;
  }

  // Fetch user details on the server
  const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/theUser`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: 'no-store',
  });
  const userData = await userResponse.json();

  // Fetch admin details on the server
  const adminResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/theAdmin`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: 'no-store',
  });
  const adminData = await adminResponse.json();

  return (
    <Profile
      username={userData?.userData?.username ?? null}
      isAdmin={adminData?.isAdmin ?? false}
    />
  );
}
