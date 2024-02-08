import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { instance as axios } from '@/libs/axios';
import { User } from '@/types/AuthType';

interface AuthContextProps {
  user: User | null;
  isPending: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateMe: (data: { nickname: string; profileImageUrl: string | null }) => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isPending: true,
  login: async () => {},
  logout: async () => {},
  updateMe: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nzk4LCJ0ZWFtSWQiOiIyLTEwIiwiaWF0IjoxNzA3MzA3Nzg0LCJpc3MiOiJzcC10YXNraWZ5In0.0uRsiFPv86b1PRbjcCv4NEPYqDDx3uFx4gswLIkOMq8';

export function AuthProvider({ children }: AuthProviderProps) {
  const [values, setValues] = useState<{ user: User | null; isPending: boolean }>({
    user: null,
    isPending: true,
  });

  async function getMe() {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true,
    }));

    let nextUser: User | null = null;

    try {
      const res = await axios.get('/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      nextUser = res.data;
    } finally {
      setValues((prevValues) => ({
        ...prevValues,
        user: nextUser,
        isPending: false,
      }));
    }
  }

  async function login({ email, password }: { email: string; password: string }): Promise<void> {
    await axios.post('/auth/login', {
      email,
      password,
    });
    await getMe();
  }

  async function logout(): Promise<void> {
    await axios.delete('/auth/logout');
    setValues((prevValues) => ({
      ...prevValues,
      user: null,
    }));
  }

  async function updateMe(data: { nickname: string; profileImageUrl: string | null }) {
    const res = await axios.put('/users/me', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const nextUser = res.data;
    setValues((prevValues) => ({
      ...prevValues,
      user: nextUser,
    }));
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        login,
        logout,
        updateMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
interface UseAuthProps {
  required: boolean;
}

export function useAuth({ required }: UseAuthProps) {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (!context) {
    throw new Error('반드시 AuthProvider 안에서 사용해야 합니다.');
  }

  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      router.push('/login');
    }
  }, [context.user, context.isPending, router, required]);

  return context;
}
