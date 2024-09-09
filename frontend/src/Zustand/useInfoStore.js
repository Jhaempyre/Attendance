import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useInfoStore =create(
    devtools(
      persist(
        (set) => ({
          authStats: false,
          authStatus : (data) => set({
            authStats : data
          })
        }),
        {
          name: 'user',
        }
      )
    )
  );
export default useInfoStore