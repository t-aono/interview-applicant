# InterviewApplicant

## 概要

面接希望者が入力した内容を管理するためのWebアプリケーション。

## 機能

**管理者側**

ログイン、質問内容の設定、回答結果の一覧表示、詳細表示、編集、削除

**応募者側**

質問への回答、画像や動画のアップロード

## 使用技術

Angular / TypeScript / SCSS / Firebase

## デモ

![iQ2goXZKApZ5dxjxaxjX1652412066-1652412087](https://user-images.githubusercontent.com/46856574/168205050-f1c905c2-5ab5-4d40-b37e-b33496cbd31a.gif)

## ローカルでの動作方法

Firebase でプロジェクトを作成する必要があります。  
認証を使用してメールパスワード認証を設定し CloudFirestore にデータベースを作成します。

1. ソースコードの取得

   ```
   git clone git@github.com:t-aono/interview-applicant.git
   ```

2. 環境変数の設定  
  .env-example をコピーして .env を作成し Firebase project に合わせて環境変数を設定します。

   ```
   cp .env-example .env
   ```

3. パッケージの追加

   ```
   npm ci
   ```

4. ローカル開発環境起動

   ```
   npm start
   ```

   ローカル環境 URL
   http://localhost:4200

