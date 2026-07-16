import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  createProperty,
  deleteProperty,
  fetchProperties,
  updateProperty,
} from '../api/properties'
import { PropertyForm } from '../components/PropertyForm'
import './PropertyList.css'

// 家賃を「¥xxx,xxx」形式で表示する
const formatRent = (rent) => `¥${rent.toLocaleString('ja-JP')} / 月`

export function PropertyList() {
  const { user, signOut } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  // 新規登録フォームの表示状態
  const [isCreating, setIsCreating] = useState(false)
  // 編集中の物件（nullなら編集していない）
  const [editingProperty, setEditingProperty] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadProperties = async () => {
    setLoading(true)
    setErrorMessage('')
    try {
      const data = await fetchProperties()
      setProperties(data)
    } catch (error) {
      setErrorMessage('物件一覧の取得に失敗しました。' + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProperties()
  }, [])

  const handleCreate = async (values) => {
    setIsSubmitting(true)
    setErrorMessage('')
    try {
      await createProperty(values)
      setIsCreating(false)
      await loadProperties()
    } catch (error) {
      setErrorMessage('物件の登録に失敗しました。' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdate = async (values) => {
    setIsSubmitting(true)
    setErrorMessage('')
    try {
      await updateProperty(editingProperty.id, values)
      setEditingProperty(null)
      await loadProperties()
    } catch (error) {
      setErrorMessage('物件の更新に失敗しました。' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('この物件を削除しますか？')) return

    setErrorMessage('')
    try {
      await deleteProperty(id)
      await loadProperties()
    } catch (error) {
      setErrorMessage('物件の削除に失敗しました。' + error.message)
    }
  }

  return (
    <div className="property-page">
      <header className="property-header">
        <div>
          <h1>物件一覧</h1>
          {user && <p className="property-user">{user.email} でログイン中</p>}
        </div>
        <button type="button" className="logout-button" onClick={signOut}>
          ログアウト
        </button>
      </header>

      {errorMessage && <p className="property-error">{errorMessage}</p>}

      {!isCreating && !editingProperty && (
        <button
          type="button"
          className="new-property-button"
          onClick={() => setIsCreating(true)}
        >
          物件を登録する
        </button>
      )}

      {isCreating && (
        <PropertyForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreating(false)}
          isSubmitting={isSubmitting}
        />
      )}

      {editingProperty && (
        <PropertyForm
          initialValues={editingProperty}
          onSubmit={handleUpdate}
          onCancel={() => setEditingProperty(null)}
          isSubmitting={isSubmitting}
        />
      )}

      {loading ? (
        <p>読み込み中...</p>
      ) : properties.length === 0 ? (
        <p>登録されている物件はありません。</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <div className="property-card" key={property.id}>
              <h2>{property.name}</h2>
              <p className="property-rent">{formatRent(property.rent)}</p>
              <p className="property-area">{property.area}</p>
              <p className="property-layout">{property.layout}</p>
              <div className="property-card-actions">
                <button type="button" onClick={() => setEditingProperty(property)}>
                  編集
                </button>
                <button type="button" onClick={() => handleDelete(property.id)}>
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
