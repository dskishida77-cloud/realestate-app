# 不動産管理Webアプリ

React + Vite製の不動産管理アプリ。Supabase認証（メールアドレス＋パスワード）でログインし、物件一覧（ダミーデータ）を表示する。

## セットアップ

```bash
npm install
```

プロジェクトルートに`.env`ファイルを作成し、SupabaseのProject URLとPublishable keyを設定する（`.env.example`を参照）。

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

## 開発サーバー起動

```bash
npm run dev
```

## ビルド

```bash
npm run build
```

## 機能

- メールアドレス＋パスワードでの会員登録・ログイン（Supabase Auth）
- ログイン後は物件一覧画面（ダミーデータ）へ遷移
- 未ログイン時はログイン画面へリダイレクト
- ログアウト機能
