# CLAUDE.md

このファイルは、Claude Code がこのリポジトリで作業する際のガイドラインです。

## プロジェクト概要

不動産アプリケーション（realestate-app）。技術スタックは未定のため、決定次第このセクションを更新してください。

## デプロイ情報

- 本番URL：https://realestate-md7gley31-dskishida77-clouds-projects.vercel.app/
- Supabaseプロジェクト名：realestate-app

## Git運用ルール

- **コードを変更したら、その都度GitHubにプッシュすること。** 変更を溜め込まず、意味のある単位（1機能・1修正ごと）でコミットし、都度リモートへプッシュする。
- コミット前に `git status` / `git diff` で変更内容を確認する。
- force push など破壊的な操作は行わない。
