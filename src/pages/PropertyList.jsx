import { useAuth } from '../contexts/AuthContext'
import { dummyProperties } from '../data/dummyProperties'
import './PropertyList.css'

// 家賃を「¥xxx,xxx」形式で表示する
const formatRent = (rent) => `¥${rent.toLocaleString('ja-JP')} / 月`

export function PropertyList() {
  const { user, signOut } = useAuth()

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

      <div className="property-grid">
        {dummyProperties.map((property) => (
          <div className="property-card" key={property.id}>
            <h2>{property.name}</h2>
            <p className="property-rent">{formatRent(property.rent)}</p>
            <p className="property-area">{property.area}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
