import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import './Auth.css'

export function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setInfoMessage('')
    setIsSubmitting(true)

    const { data, error } = await supabase.auth.signUp({ email, password })

    setIsSubmitting(false)

    if (error) {
      setErrorMessage('会員登録に失敗しました。' + error.message)
      return
    }

    // メール確認が有効な場合はセッションが発行されないため、案内を表示する
    if (!data.session) {
      setInfoMessage('確認メールを送信しました。メール内のリンクから登録を完了してください。')
      return
    }

    navigate('/', { replace: true })
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>会員登録</h1>

        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete="new-password"
        />

        {errorMessage && <p className="auth-error">{errorMessage}</p>}
        {infoMessage && <p className="auth-info">{infoMessage}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '登録中...' : '会員登録'}
        </button>

        <p className="auth-switch">
          既にアカウントをお持ちの方は <Link to="/login">ログイン</Link>
        </p>
      </form>
    </div>
  )
}
