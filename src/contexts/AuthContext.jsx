import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

// 認証状態（ログイン中のユーザー情報）をアプリ全体で共有するためのコンテキスト
const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  // 初回のセッション確認が終わるまでのローディング状態
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 起動時に現在のセッションを取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // ログイン・ログアウトなど認証状態の変化を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // ログアウト処理
  const signOut = () => supabase.auth.signOut()

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthはAuthProviderの内側で使用してください')
  }
  return context
}
