# 第3回：スライドに対応した操作・コピー用テキスト

表紙は1ページ目です。下記は2ページ目から対応しています。実習の入力文をコピーして使えます。

## 2ページ：今日のゴールと60分の流れ



完成するもの：公開URLと、選んだ形式の配布物

0–5分　公開の全体像
5–15分　サーバー・DBと設定
15–30分　DB接続とデプロイ
30–38分　SEOとOG画像
38–55分　コース別の配布
55–60分　相互確認と提出

**完了の目安・確認：** 相手が自分の端末で使い始められれば、この回の完成

## 3ページ：公開前の準備

事前準備　授業時間外

Cloudflareのアカウントを事前に準備する。
料金と無料枠の制限を確認する。
教材の03-releaseを開き、npm installを済ませる。
WindowsコースはElectron関連の準備も済ませる。
PWAコースは192pxと512pxのPNGアイコンを用意する。

公開する情報と、配布するファイルを確認する。

**完了の目安・確認：** サーバーやDBの料金はChatGPT Plusの料金に含まれない

参照先：
- https://developers.cloudflare.com/workers/platform/pricing/
- https://developers.cloudflare.com/d1/platform/pricing/

## 4ページ：公開に使うサービス

全体像　0–5分

Cloudflare Workers
Webページとサーバーの処理を公開。

Cloudflare D1
公開用のおすすめ情報を保存。

GitHub
コードと変更履歴を保存。
今回の公開操作はWranglerで行う。

**完了の目安・確認：** 自分でサーバーOSを管理しない構成で、公開の流れを学ぶ

参照先：
- https://developers.cloudflare.com/workers/static-assets/

## 5ページ：画面・サーバー・DBの担当

基礎　5–15分



### 画面

利用者が操作する。

地域を選ぶ。
チェックする。
取得した情報を表示。

### サーバー

依頼に応じて処理する。

必要な認証を確認。
DBへ問い合わせる。
JSONを返す。

### DB

データを保存・検索する。

今回の表はplaces。
行ごとにスポットを保存。
列はid、name、note。

**完了の目安・確認：** Windowsや拡張機能からも、同じ公開APIを利用できる

## 6ページ：端末内の保存とDBの保存

基礎　5–15分



### localStorage

今使っているブラウザーに保存。

今回の持ち物チェックに使用。
別の端末へは自動で移らない。
ブラウザーデータの削除で失われる。

### クラウドDB

インターネット上で保存。

今回の公開スポット情報に使用。
複数の端末から同じ情報を取得。

個人別保存には認証・権限が必要。

**完了の目安・確認：** すべてのアプリにDBが必要なわけではない

## 7ページ：SQLで表とデータを用意

基礎　5–15分

schema.sqlには、公開してよいサンプル情報だけを入れる。

```text
CREATE TABLE IF NOT EXISTS places (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  note TEXT NOT NULL
);
INSERT OR IGNORE INTO places VALUES
  (1, '公園', '散歩におすすめ');
```

**完了の目安・確認：** SQLはDBを操作する言語。SELECTで読み、INSERTで追加する

## 8ページ：D1データベースの作成

実習　15–30分

03-releaseのターミナルで操作。

1. npx wrangler login
2. 自分のアカウントへログイン。
3. npx wrangler d1 create odekake-db
4. 表示されたdatabase_idを控える。

授業用の新しいDBを作る。

**完了の目安・確認：** 既存の業務用DBや、個人情報の入ったDBは使わない

参照先：
- https://developers.cloudflare.com/d1/get-started/

## 9ページ：WorkerとDBの接続

実習　15–30分

wrangler.jsoncのd1_databasesを編集。

bindingはDB。
database_nameはodekake-db。
database_idは作成時の値。

サーバーのコードはenv.DBから
このDBを読み取る。

**完了の目安・確認：** キーの文字列ではなく、サービス内の接続設定を使う

参照先：
- https://developers.cloudflare.com/d1/get-started/

## 10ページ：公開DBへの登録と確認

実習　15–30分

1. schema.sqlを公開DBへ適用。
2. SELECTで登録した行を確認。
3. その後にアプリをデプロイ。

--localはPC内のDB。
--remoteはCloudflare側のDB。

どちらを操作するか確認する。

**完了の目安・確認：** 実行するコマンドは次のスライドからコピーできる

参照先：
- https://developers.cloudflare.com/d1/get-started/

## 11ページ：デプロイまでのコマンド

実習　15–30分

03-release内で実行する。先にdatabase_idと公開内容を確認する。

```text
npx wrangler d1 execute odekake-db --remote --file=schema.sql

npx wrangler d1 execute odekake-db --remote --command="SELECT * FROM places"

npx wrangler deploy
```

**完了の目安・確認：** 完了後に表示されたhttpsの公開URLを、READMEへ記録する

参照先：
- https://developers.cloudflare.com/d1/get-started/
- https://developers.cloudflare.com/workers/wrangler/commands/

## 12ページ：公開したアプリの確認

実習　15–30分

1. 公開URLを別のタブで開く。
2. /api/placesも開く。
3. sourceがd1であることを確認。
4. 画面でスポットを読み込む。

右はローカルのサンプル画面。
クラウド接続の成功例ではない。

**完了の目安・確認：** ローカルの表示だけで、公開DBへの接続成功と判断しない

## 13ページ：Codexへの公開準備の依頼

実習の参照

授業用コードの公開設定を、自分の環境に合わせる。

```text
03-releaseをCloudflare WorkersとD1で公開します。
wrangler.jsonc、worker.js、schema.sqlを確認してください。
公開データだけを返す読み取り専用APIを維持してください。
設定不足と公開する内容を説明してください。
本番URLと/api/placesで確認する手順を提示してください。
ローカルの確認と、実際の公開確認を分けて報告してください。
```

**完了の目安・確認：** 実際に公開する操作と対象アカウントを、自分で確認する

## 14ページ：作品紹介ページのSEO

公開の整備　30–38分

タイトルで内容を伝える。
見出しを自然な順序にする。
誰に役立つかを具体的に書く。
スマホでも読みやすくする。

公開ページが外から開けるか、
不要なnoindexがないか確認する。

**完了の目安・確認：** 設定直後の検索掲載や上位表示は、完成条件にしない

参照先：
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide

## 15ページ：OG画像と共有時の見え方

公開の整備　30–38分

OGPは、共有時に使われる情報。

og:title　作品名
og:description　短い説明
og:image　画像のURL
og:url　公開ページのURL
og:type　ページの種類

画像も外部から取得できる必要がある。

**完了の目安・確認：** SEOとOGPは目的が違う。両方を設定する

参照先：
- https://ogp.me/

## 16ページ：公開URLに合わせたメタ情報

実習　30–38分

index.htmlのhead内へ設定。example.comは必ず自分の公開URLへ置き換える。

```text
<title>おでかけノート | 天気と持ち物</title>
<meta name="description" content="外出前の準備を確認するアプリ">
<meta property="og:title" content="おでかけノート">
<meta property="og:type" content="website">
<meta property="og:description" content="天気と持ち物を確認">
<meta property="og:url" content="https://example.com/">
<meta property="og:image" content="https://example.com/og.png">
```

**完了の目安・確認：** 画像を置き、再デプロイして、画像URLを直接開いて確認する

参照先：
- https://ogp.me/

## 17ページ：共有画像の作り方

実習　30–38分

ChatGPTで、作品名と用途が伝わる画像を作る。
教材では1200×630pxを目安に用意する。
端に小さな文字を置かず、中央に作品名を配置する。
og.pngとしてpublicへ保存し、メタ情報を更新する。

共有サービス側のキャッシュで、古い画像が残る場合がある。

**完了の目安・確認：** 画像サイズは共有先の仕様も確認する。実際の共有プレビューで点検

補足：1200×630pxはこの教材での制作寸法。すべての共有先で完全に同じ表示を保証するものではない。

## 18ページ：配布する形式を1つ選ぶ

コース別実習　38–55分



### Windows

次の2枚を使用。

アプリを起動確認。
配布用ファイルを生成。
別のPCで動作確認。

### モバイルPWA

PWAの2枚を使用。

公開URLを用意。
アイコンを設定。
スマホへ追加して起動。

### 拡張機能

拡張機能の3枚を使用。

manifestを確認。
読み込みと動作確認。
ZIPと導入手順を共有。

**完了の目安・確認：** 選ばなかったコースは、授業後に参照できる

## 19ページ：Windows：アプリの起動

Windowsコース　38–55分

1. public/config.jsのapiBaseに
自分の公開URLを設定。
2. desktopフォルダーへ移動。
3. npm run startで起動確認。

画面のNode.js権限は無効にし、
必要な機能だけを持たせる。

**完了の目安・確認：** 事前準備：npm install --save-dev electron electron-builder

参照先：
- https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging

## 20ページ：Windows：配布と確認

Windowsコース　38–55分

desktop内で npm run pack を実行。
dist内の配布ファイルを確認する。
起動方法と、通信に使うサービスをREADMEへ記載。
別のWindows PCへ渡して、起動と通信を確認。

署名や端末のポリシーによる警告は、事前に講師と確認する。
保護機能を無効にして進めない。

**完了の目安・確認：** 自分の開発環境で起動しただけでは、配布確認は完了しない

参照先：
- https://www.electronjs.org/docs/latest/tutorial/code-signing

## 21ページ：PWA：名前とアイコン

モバイルコース　38–55分

manifest.webmanifestは、アプリ名・起動先・表示方法などを記述する。

```text
{
  "name": "おでかけノート",
  "short_name": "おでかけ",
  "start_url": "/",
  "display": "standalone",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**完了の目安・確認：** 画像ファイルもpublicへ保存する。公開先はHTTPSを使う

参照先：
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable

## 22ページ：PWA：スマホで利用

モバイルコース　38–55分

1. スマホで自分の公開URLを開く。
2. ブラウザーの共有やメニューから
ホーム画面への追加を選ぶ。
3. 追加したアイコンから起動。
4. 表示と天気取得を確認。

操作名はOS・ブラウザーで異なる。

**完了の目安・確認：** ホーム画面への追加と、ストアへの掲載は別の手順

参照先：
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing

## 23ページ：拡張機能：manifest.json

拡張機能コース　38–55分

拡張機能は、画面のファイルに設定ファイルを加えて作る。

```text
{
  "manifest_version": 3,
  "name": "おでかけノート",
  "version": "1.0.0",
  "action": { "default_popup": "index.html" }
}
```

**完了の目安・確認：** 今回の機能に不要な、全サイトの閲覧権限などは付けない

参照先：
- https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world

## 24ページ：拡張機能：読み込み

拡張機能コース　38–55分

1. node prepare-extension.mjsを実行。
2. 拡張機能の管理画面を開く。
3. 自分の教材ソースを確認する。
4. デベロッパーモードを有効にする。
5. 「パッケージ化されていない
拡張機能を読み込む」で
extensionフォルダーを選ぶ。

**完了の目安・確認：** 管理端末で制限がある場合は、講師へ相談する

参照先：
- https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked

## 25ページ：拡張機能：配布と更新

拡張機能コース　38–55分

1. ポップアップを開いて動作確認。
2. extensionフォルダーをZIPにする。
3. 解凍・読み込み手順を添える。
4. 別の環境で導入確認。

一般向けストア公開には、
登録・掲載情報・審査が必要。

**完了の目安・確認：** 授業内のZIP配布は、ストア公開の完了を意味しない

参照先：
- https://developer.chrome.com/docs/webstore/publish/

## 26ページ：別の人に使ってもらう

相互確認と提出　55–60分

説明せずに、READMEと配布物を渡す。
相手が起動できるかを見る。
主要な操作を1つ試してもらう。
分かりにくかった場所を1つ聞く。
必要な修正をcommitに残す。

提出：公開URL、配布物、画面写真、README。

**完了の目安・確認：** 「相手が使えたこと」と「まだ確認できていないこと」を分けて報告

## 27ページ：公開後の更新と復旧

授業後の運用

変更前の動く版を、commitと配布ファイルで残す。
小さな変更を加えて、ローカルで確認する。
デプロイまたは再パッケージ化する。
公開先や別の端末でも確認する。

不具合が出たら、変更点とエラーを確認して戻す。
DBのデータ変更は、コードを戻すだけでは元に戻らない。

**完了の目安・確認：** 公開は終点ではなく、使われ方を見て改善する開始点

## 28ページ：公開トラブルの確認順

困ったときの参照

画面が開かない：URL、公開状態、デプロイのエラー。
DBが読めない：database_id、binding、表の作成先。
画像が出ない：ファイル名、大文字小文字、公開画像URL。
PWAが更新されない：Service Workerとキャッシュ。
拡張機能が動かない：manifest、管理画面のエラー、再読み込み。

秘密の値を除いて、操作・期待・実際をCodexへ伝える。

**完了の目安・確認：** 「動かない」を、どの段階で止まったかに分解する

## 29ページ：次の一歩：ストア公開

発展課題　授業後

Windows：署名、インストーラー、必要ならMicrosoft Store。
モバイル：ネイティブ版、開発者登録、実機確認、ストア審査。
拡張機能：説明文、アイコン、画像、権限とデータ利用の申告。

必要な環境・料金・審査条件は、各ストアの最新情報で確認。
今回の作品を土台に、別の公開支援回で進める。

**完了の目安・確認：** 成果物：自分で説明でき、別の人が試せるアプリ

参照先：
- https://developer.apple.com/programs/enroll/
- https://developer.chrome.com/docs/webstore/publish/
