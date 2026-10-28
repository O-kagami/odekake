# 第3回：同じodekakeへDB・公開・配布を追加

教材：https://github.com/O-kagami/odekake

前提：第2回のAPI連携が動く自分のforkとclone先。編集元は01-start/publicです。

## 2ページ：今日のゴールと60分の流れ

完成するもの：前回のodekakeにDBを加え、配布する

0–7分　同じfork・前回の作品から再開
7–17分　画面・サーバー・DBと実装準備
17–30分　DB登録とCloudflareへデプロイ
30–40分　SEO・OG画像・再公開と履歴保存
40–55分　Windows・PWA・拡張機能から1つ
55–60分　相互確認と提出

完了の目安：天気・体感温度・自分の持ち物を残し、DBと配布を追加する

## 3ページ：公開前の準備

第2回のfork・clone先・Pages URLを用意する。
Cloudflareのアカウント・料金・制限を確認する。
同じforkの03-releaseで npm install を済ませる。
配布先を1つ選び、必要な端末と準備を済ませる。
WindowsはdesktopでElectron関連を導入しておく。

OG画像の素材と、試してもらう相手も準備する。

完了の目安：準備・ダウンロード・ストア審査は60分に含めない。Plusとは別のサービス

参考：https://developers.cloudflare.com/workers/platform/pricing/
https://developers.cloudflare.com/d1/platform/pricing/

## 4ページ：第2回の作品から再開

① 自分のforkと前回のPagesを開く。
② clone済みの同じフォルダーを開く。
③ git status と git remote -v を確認。
④ node serve.mjs 01-start で起動。
⑤ 天気・体感温度・持ち物を確認。

前回の動く状態をcommitして残す。
新しいアプリやforkは作らない。

完了の目安：必要なこと：第2回のAPIが動き、前回の変更を説明できる

## 5ページ：編集元は3回とも同じ



### 01-start/public：自分の作品

持ち物・表示・天気APIを保持。
DBの表示・SEO・OG画像を追加。
PWAの素材もここへ置く。

名前に01があっても、
第3回まで同じ場所を編集する。

### 03-release：公開・配布の道具

worker.js・schema.sql・公開設定。
自分の作品を読み込んで公開。

publicは素材見本。上書きに使わない。
distは配布用に生成したコピー。
GitHub Pagesのdocsは第2回の版。

完了の目安：既存のforkに新しい補助ファイルがない場合は、READMEの移行手順を先に実施

## 6ページ：同じアプリの公開先を広げる

GitHubは同じforkを使う。

第2回：GitHub Pages
画面を配り、天気APIを呼ぶ。

第3回：Cloudflare WorkersとD1
同じ画面＋サーバー＋DBを公開。

Workersの新しい公開URLを使う。

完了の目安：旧Pagesは第2回の版。READMEへ新しい作品URLを記載する

参考：https://developers.cloudflare.com/workers/static-assets/

## 7ページ：画面・サーバー・DBの担当



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

完了の目安：Windowsや拡張機能からも、同じ公開APIを利用できる

## 8ページ：端末内の保存とDBの保存



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

完了の目安：公開先のURLが変わると保存領域も変わる。チェックは自動移行されない

## 9ページ：同じ作品へDB連携を加える依頼

教材にはDB取得のひな形がある。既存コードを読み、必要な差分を加える。

```text
01-start/publicを続けて編集します。前回の変更を残してください。
気温・体感温度・持ち物の追加・チェック保存を維持してください。
config.jsのlessonを3にし、既存のスポット取得処理を確認してください。
03-releaseのworker.jsとschema.sqlを使い、公開用DBを読み取ります。
wrangler.jsoncのassets.directoryは../01-start/publicにします。
教材ルートでnode prepare-release.mjsを実行し、不足するPWA素材を追加。
index.htmlへmanifestリンクを追加し、WebのapiBaseは空欄を維持。
node serve.mjs 01-startで確認し、実際のDB接続確認は公開後に行います。
```

完了の目安：変更前にgit status・差分を確認し、前回の動く版をcommitして残す

## 10ページ：SQLで表とデータを用意

03-release/schema.sqlへ、公開用のスポットを1件追加する。

```text
CREATE TABLE IF NOT EXISTS places (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  note TEXT NOT NULL
);
INSERT OR IGNORE INTO places VALUES
  (3, '広場', '待ち合わせに便利');
```

完了の目安：idは重複させない。既存行の変更はINSERT OR IGNOREでは反映されない

## 11ページ：D1データベースの作成

03-release内で操作する。

① npx wrangler login
② 自分のアカウントを確認する。
③ npx wrangler d1 create odekake-db
④ database_idを控える。

作成済みなら、そのDBを使う。

完了の目安：公開してよい授業用データだけを保存する

参考：https://developers.cloudflare.com/d1/get-started/

## 12ページ：WorkerとDBの接続

03-release/wrangler.jsoncを確認。

binding：DB
database_name：odekake-db
database_id：作成時の値

assets.directory：
../01-start/public

前回の画面をそのまま配信する。

完了の目安：03-release/publicは素材見本。作品全体を入れ替えない

参考：https://developers.cloudflare.com/d1/get-started/

## 13ページ：公開DBへの登録と確認

1. schema.sqlを公開DBへ適用。
2. SELECTで登録した行を確認。
3. その後にアプリをデプロイ。

--localはPC内のDB。
--remoteはCloudflare側のDB。

どちらを操作するか確認する。

完了の目安：実行するコマンドは次のスライドからコピーできる

参考：https://developers.cloudflare.com/d1/get-started/

## 14ページ：デプロイまでのコマンド

03-release内で実行。database_idと公開するソースを先に確認する。

```text
npx wrangler d1 execute odekake-db --remote --file=schema.sql

npx wrangler d1 execute odekake-db --remote --command="SELECT * FROM places"

npx wrangler deploy
```

完了の目安：Wranglerが表示した新URLを記録。git pushだけではWorkersは更新されない

参考：https://developers.cloudflare.com/d1/get-started/
https://developers.cloudflare.com/workers/wrangler/commands/

## 15ページ：公開したアプリの確認

① 新しい公開URLを開く。
② /api/places のsourceがd1か確認。
③ 自分が追加したスポットを読む。
④ 気温・体感温度を取得する。
⑤ 自分の持ち物と見た目も確認。

右はローカルの確認例。
公開DBの成功例ではない。

完了の目安：local-sampleとd1を区別。通信に失敗した場合の表示も確認する

## 16ページ：作品紹介ページのSEO

同じ01-start/public/index.htmlを編集。

作品名と用途が伝わるtitle。
自然な順序の見出しと短い説明。
スマホで読みやすいレイアウト。

新しい公開URLを正規URLに設定。
公開状態とnoindexの有無を確認。

完了の目安：旧Pagesと新URLを区別。検索への掲載時期や順位は保証されない

参考：https://developers.google.com/search/docs/fundamentals/seo-starter-guide

## 17ページ：OG画像と共有時の見え方

OGPは、共有時に使われる情報。

og:title　作品名
og:description　短い説明
og:image　画像のURL
og:url　公開ページのURL
og:type　ページの種類

画像も外部から取得できる必要がある。

完了の目安：SEOとOGPは目的が違う。両方を設定する

参考：https://ogp.me/

## 18ページ：公開URLに合わせたメタ情報

01-start/public/index.htmlのheadへ。example.comを新しいWorkers URLへ変更。

```text
<title>おでかけノート | 天気と持ち物</title>
<meta name="description" content="外出前の準備を確認するアプリ">
<link rel="canonical" href="https://example.com/">
<meta property="og:title" content="おでかけノート">
<meta property="og:type" content="website">
<meta property="og:description" content="天気と持ち物、おすすめを確認">
<meta property="og:url" content="https://example.com/">
<meta property="og:image" content="https://example.com/og.png">
```

完了の目安：既存タグは更新し、重複を避ける。画像も新しい公開先へ置く

参考：https://ogp.me/

## 19ページ：共有画像の作り方

自分の作品名と用途が伝わるOG画像をChatGPTで作る。
教材の制作寸法は1200×630pxを目安にする。
小さな文字を端へ置かず、作品名を読みやすくする。
01-start/public/og.pngへ保存し、メタ情報を更新する。

再デプロイ後、画像URLと共有プレビューを確認する。
共有先のキャッシュで古い画像が残る場合もある。

完了の目安：画像の生成待ちに備え、素材は事前準備。作成後の実サイズも確認する

補足：1200×630pxはこの教材での制作寸法。すべての共有先で完全に同じ表示を保証するものではない。

## 20ページ：同じforkに保存し、再公開する

教材ルートで差分を確認し、ソースを保存。配布物はdistに生成する。

```text
git status
git diff
git add 01-start/public 01-start/SPEC.md 03-release README.md prepare-release.mjs
git diff --cached
git commit -m "DB連携と公開・配布の準備を追加"
git push
cd 03-release
npx wrangler deploy
```

完了の目安：新URL・/api/places・/og.pngを確認。第3回ではprepare-pagesを実行しない

## 21ページ：配布する形式を1つ選ぶ



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

完了の目安：選ばなかったコースは、授業後に参照できる

## 22ページ：Windows：アプリの起動

同じ01-start/publicを配布用にコピー。
Webのconfig.jsは変更しない。

03-release内で次を実行する。
node prepare-distribution.mjs
  desktop https://自分の公開ホスト
（上の2行は1行で入力）

cd desktop
npm run start

完了の目安：配布用コピーだけに公開API URLを設定。天気・体感温度・DB・持ち物を確認

参考：https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging

## 23ページ：Windows：配布と確認

03-release/desktopで npm run pack を実行。
desktop/dist内の配布ファイルを別のWindows PCで開く。
前回の持ち物、気温・体感温度、DB取得を確認する。
READMEへ起動方法・通信先・確認環境を記載する。

更新時は、同じ編集元から配布用コピーを作り直す。
署名や端末ポリシーは講師と確認し、保護機能を維持する。

完了の目安：Windows版の生成・相手の端末での起動までを実習の完了条件にする

参考：https://www.electronjs.org/docs/latest/tutorial/code-signing

## 24ページ：PWA：名前とアイコン

01-start/public/manifest.webmanifestを編集。名前を自分の作品に合わせる。

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

完了の目安：01-start/publicのアイコンとmanifestリンクを確認し、Workersへ再デプロイ

参考：https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable

## 25ページ：PWA：スマホで利用

① 新しいWorkers URLをスマホで開く。
② 共有やメニューから
ホーム画面への追加を選ぶ。
③ アイコンから起動する。
④ 天気・体感温度・DBを確認。
⑤ 自分の持ち物と保存を確認。

操作名はOS・ブラウザーで異なる。

完了の目安：URLと追加手順を配布する。PWAはストア審査を通すネイティブアプリとは別

参考：https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing

## 26ページ：拡張機能：manifest.json

生成するmanifestには、天気APIと自分の公開ホストだけを指定する。

```text
{
  "manifest_version": 3,
  "name": "おでかけノート",
  "version": "1.0.0",
  "action": { "default_popup": "index.html" },
  "host_permissions": [
    "https://api.open-meteo.com/*",
    "https://自分の公開ホスト/*"
  ]
}
```

完了の目安：03-release/extension-manifest.jsonで名前を編集。URL権限は生成時に設定する

参考：https://developer.chrome.com/docs/extensions/develop/concepts/network-requests

## 27ページ：拡張機能：読み込み

03-release内で実行する。
node prepare-distribution.mjs
  extension https://自分の公開ホスト
（上の2行は1行で入力）

拡張機能の管理画面で
デベロッパーモードを有効にする。
「パッケージ化されていない
拡張機能を読み込む」から
dist/extensionを選ぶ。

完了の目安：Chromeはchrome://extensions、Edgeはedge://extensionsを開く

参考：https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked

## 28ページ：拡張機能：配布と更新

① ポップアップで前回の機能を確認。
② DBのスポットも取得する。
③ dist/extensionをZIPにする。
④ 解凍・読み込み手順を添える。
⑤ 別の環境で導入確認する。

更新時は同じ編集元から再生成し、
拡張機能の再読み込みも行う。

完了の目安：授業内は開発者向けZIP配布。一般向けストア公開は発展課題

参考：https://developer.chrome.com/docs/webstore/publish/

## 29ページ：別の人に使ってもらう

READMEと配布物を渡し、相手が起動できるか確かめる。
気温・体感温度・自分の持ち物・DB取得を試してもらう。
新しい公開URLとOG画像のURLも開いてもらう。
分かりにくかった点を1つ聞き、修正をcommitする。

提出：同じfork、新しい公開URL、配布物または導入URL、
確認画面、README、今回のcommit。

完了の目安：保存データは配布先ごとに別。確認済みの環境と未確認の環境を記載する

## 30ページ：公開後の更新と復旧

引き続き01-start/publicを編集する。
Web/PWAは03-releaseで npx wrangler deploy。
Windows・拡張機能は配布用コピーを再生成する。
Windowsは再ビルド、拡張機能は再読み込み・再配布。

同じforkへcommit・pushし、READMEの更新日と版を記録。
DBのデータ変更は、コードを戻すだけでは元に戻らない。

完了の目安：03-release/publicの見本やdistの生成物を、アプリの編集元にしない

## 31ページ：公開トラブルの確認順

画面が開かない：URL、公開状態、デプロイのエラー。
DBが読めない：database_id、binding、表の作成先。
画像が出ない：ファイル名、大文字小文字、公開画像URL。
PWAが更新されない：Service Workerとキャッシュ。
拡張機能が動かない：manifest、管理画面のエラー、再読み込み。

秘密の値を除いて、操作・期待・実際をCodexへ伝える。

完了の目安：「動かない」を、どの段階で止まったかに分解する

## 32ページ：次の一歩：ストア公開

Windows：署名、インストーラー、必要ならMicrosoft Store。
モバイル：ネイティブ版、開発者登録、実機確認、ストア審査。
拡張機能：説明文、アイコン、画像、権限とデータ利用の申告。

必要な環境・料金・審査条件は、各ストアの最新情報で確認。
今回の作品を土台に、別の公開支援回で進める。

完了の目安：成果物：自分で説明でき、別の人が試せるアプリ

参考：https://developer.apple.com/programs/enroll/
https://developer.chrome.com/docs/webstore/publish/

## 配布コマンドのコピー用（03-release内）

公開URLは自分のWorkers URLへ置き換えます。

```sh
node prepare-distribution.mjs desktop https://example.com
node prepare-distribution.mjs extension https://example.com
```

選んだコースの1行だけ実行します。PWAにはこのコピー処理は不要です。
