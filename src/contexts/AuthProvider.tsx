import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { instance as axios } from '@/libs/axios';
import { User } from '@/types/AuthType';
import { parse } from 'cookie';
interface AuthContextProps {
  user: User | null;
  isPending: boolean;
  // login: (credentials: { email: string; password: string }) => Promise<void>;
  // logout: () => Promise<void>;
  updateMe: (data: { nickname: string; profileImageUrl: string | null }) => void;
  updatePassword: (data: { password: string; newPassword: string }) => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isPending: true,
  // login: async () => {},
  // logout: async () => {},
  updateMe: () => {},
  updatePassword: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [values, setValues] = useState<{ user: User | null; isPending: boolean }>({
    user: null,
    isPending: true,
  });

  async function getMe() {
    const cookies = parse(document.cookie);
    const accessToken = cookies.accessToken;

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

  // async function login({ email, password }: { email: string; password: string }): Promise<void> {
  //   await axios.post('/auth/login', {
  //     email,
  //     password,
  //   });
  //   await getMe();
  // }

  // async function logout(): Promise<void> {
  //   await axios.delete('/auth/logout');
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     user: null,
  //   }));
  // }

  async function updateMe(data: { nickname: string; profileImageUrl: string | null }) {
    const cookies = parse(document.cookie);
    const accessToken = cookies.accessToken;

    const res = await axios.put('/users/me', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      alert('프로필이 수정되었습니다.');
    }
    const nextUser = res.data;
    setValues((prevValues) => ({
      ...prevValues,
      user: nextUser,
    }));
  }

  async function updatePassword(data: { password: string; newPassword: string }) {
    const cookies = parse(document.cookie);
    const accessToken = cookies.accessToken;

    await axios
      .put('/auth/password', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.status === 204) {
          alert('비밀번호가 변경되었습니다.');
          // 다시 로그인 해야할까?
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert('현재 비밀번호가 틀립니다');
        } else {
          console.log('Error', error.message);
        }
      });
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        // login,
        // logout,
        updateMe,
        updatePassword,
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
