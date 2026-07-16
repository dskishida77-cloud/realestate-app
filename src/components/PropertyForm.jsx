import { useState } from 'react'
import './PropertyForm.css'

// 物件の新規登録・編集で共通利用するフォーム
export function PropertyForm({ initialValues, onSubmit, onCancel, isSubmitting }) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [rent, setRent] = useState(initialValues?.rent ?? '')
  const [area, setArea] = useState(initialValues?.area ?? '')
  const [layout, setLayout] = useState(initialValues?.layout ?? '')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ name, rent: Number(rent), area, layout })
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <label htmlFor="property-name">物件名</label>
      <input
        id="property-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="property-rent">家賃（円）</label>
      <input
        id="property-rent"
        type="number"
        min="0"
        value={rent}
        onChange={(e) => setRent(e.target.value)}
        required
      />

      <label htmlFor="property-area">エリア名</label>
      <input
        id="property-area"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        required
      />

      <label htmlFor="property-layout">間取り</label>
      <input
        id="property-layout"
        placeholder="例：1LDK"
        value={layout}
        onChange={(e) => setLayout(e.target.value)}
        required
      />

      <div className="property-form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '保存中...' : '保存'}
        </button>
        <button type="button" onClick={onCancel} disabled={isSubmitting}>
          キャンセル
        </button>
      </div>
    </form>
  )
}
