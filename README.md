# odekake：AIアプリ制作講座の教材

教材の公開見本：[おでかけノート](https://o-kagami.github.io/odekake/)

受講者は自分のforkで演習し、自分のPages URLを作ります。

## 必要なもの
PC、ChatGPT PlusとCodex、Git、GitHubアカウント、Node.jsのLTS。プログラミング経験は不要ですが、ファイルの展開とフォルダーの操作は使います。

このREADME.mdとserve.mjsがあるフォルダーをCodexで開き、3回分のスライドと併せて進めます。

## 起動
教材ルートのターミナルで実行します。

```sh
node serve.mjs 01-start
```

http://localhost:4173 を開きます。終了はCtrl+C。同じポートで同時に起動できません。完成版へ切り替えるときは終了後に、下から必要な1行だけ実行します。

```sh
node serve.mjs 01-complete
node serve.mjs 02-complete
node serve.mjs 03-release
```

## Markdown練習室
別のターミナルで起動し、http://localhost:4174 を開きます。

```sh
node serve.mjs lab 4174
```

簡易プレビューなので、最終確認はGitHubなど実際に使う画面で行います。

## フォルダー
- 01-start：編集用ひな形とSPEC.md。
- 01-complete：第1回の復旧用。
- 02-complete：天気API連携の復旧用。
- 03-release：公開DB、PWA、Windows、拡張機能の配布準備用。
- docs：第1回のPages公開用。prepare-pages.mjsで生成。
- handouts/lesson-1.md〜lesson-3.md：スライドの順序に対応したコピー用テキスト。
- teacher-guide.md：講師用の準備・時間配分・完成の判定。

## 第1回：新規作成・fork・GitHub Pages

1. GitHubのNew repositoryで、練習用の **github-practice** を新規作成。Public、READMEありで作ります。
2. 教材 [O-kagami/odekake](https://github.com/O-kagami/odekake) を開き、Forkを押します。Ownerに自分、名前odekake、mainのみを選びます。
3. **自分のfork** のCodeからHTTPS URLをコピーし、Codexにcloneを依頼します。
4. clone先のREADMEと01-start/SPEC.mdを編集し、Markdownを練習します。LICENSEと元教材へのリンクは残します。
5. 01-start/publicの持ち物に1項目を追加し、ローカルで保存を確認します。
6. 教材ルートで次を実行します。

```sh
node prepare-pages.mjs
git status
git diff
git add 01-start/public/app.js 01-start/SPEC.md README.md docs
git diff --cached
git commit -m "持ち物アプリを変更しPages公開を準備"
git push
```

他のファイルを変更した場合はgit addの対象も調整します。git remote -vでoriginが自分のforkになっていることを確認してください。

7. **自分のfork** のSettings → Pagesを開きます。SourceはDeploy from a branch、Branchはmain、Folderは/docsとしてSaveします。
8. Actionsでpages build and deploymentの完了を待ち、Settings → Pagesに表示された公開URLを開きます。標準のURLは https://自分のID.github.io/odekake/ です。
9. 別の端末でも表示を確認し、READMEへ自分の公開URLと画面写真を追記します。新規作成したリポジトリ、fork、Pagesの3つのURLを提出します。

公開forkのコードとPagesサイトは誰でも閲覧できます。個人情報・秘密情報を含めません。教材は静的HTML/CSS/JSを公開し、サーバー処理とDBは第3回に扱います。公開には数分かかる場合があります。

### 更新・復旧
01-start/publicを変更した後は、prepare-pages.mjsを再実行し、docsもcommit・pushします。最初から入っているdocsは開始時点のアプリです。自分の変更をコピーし忘れると、古い画面が公開されます。

404はmain /docsとdocs/index.html、表示崩れはCSS/JSの相対パス、公開待ちはActionsの実行結果を確認します。

## Cloudflareへ公開
03-release内で順に実行します。

```sh
npm install
npx wrangler login
npx wrangler d1 create odekake-db
```

表示されたdatabase_idをwrangler.jsoncの対応する欄へ設定します。DBを作成済みなら再作成せず、そのIDを確認します。

```sh
npx wrangler d1 execute odekake-db --remote --file=schema.sql
npx wrangler d1 execute odekake-db --remote --command="SELECT * FROM places"
npx wrangler deploy
```

自分のアカウントにDBを作り、インターネットへ公開する操作です。アカウント・料金・利用制限を事前に確認してください。公開URLの/api/placesでsourceがd1となり、画面でもスポットを取得できることを確認します。

## SEO・OG画像・PWA
public/index.htmlのタイトルと説明を編集します。og:urlとog:imageを追加し、自分の公開URLを設定します。授業で作ったOG画像をpublic/og.pngへ保存し、再デプロイします。

PWA用の192px・512pxのアイコンは同梱しています。作品に合わせて変更できます。HTTPSの公開URLをスマホで開き、共有やメニューからホーム画面へ追加します。操作名・対応範囲はOSとブラウザーで異なります。

## 公開API URL
Web/PWAでは同じ公開先へ通信するため、public/config.jsのapiBaseは空欄で使えます。Windowsと拡張機能では、httpsで始まる自分の公開URLを設定してください。末尾にスラッシュは付けません。

## Windows
Windows PCを使います。03-release/desktop内で実行します。

```sh
npm install --save-dev electron electron-builder
npm run start
```

画面と通信を確認してから配布ファイルを生成します。

```sh
npm run pack
```

dist内のファイルを別のWindows PCで起動します。署名や端末ポリシーの警告は講師と確認し、保護機能を無効にして進めないでください。

## 拡張機能
公開API URLの設定後、03-release内で実行します。

```sh
node prepare-extension.mjs
```

Chromeの拡張機能管理画面 chrome://extensions でデベロッパーモードを有効にし、「パッケージ化されていない拡張機能を読み込む」でextensionフォルダーを選びます。自分の教材ソースであることを確認して操作してください。動作確認後、このフォルダーをZIPにし、解凍・読み込み手順を添えます。ストア公開には別途登録・審査等が必要です。

## データと確認範囲
チェックはブラウザーのlocalStorageに保存。天気取得時は選んだ地域の座標をOpen-Meteoへ送ります。公開DBは公開用スポット情報のみを読み取ります。認証機能はありません。CORSはアクセス認証ではありません。

チェック保存、公開天気API、ローカルのサンプルデータ表示をブラウザーで確認しています。ローカルの/api/placesはsourceがlocal-sampleで、D1接続ではありません。第1回のGitHub Pages公開、表示とチェック保持は確認済みです。第3回のCloudflareへの公開、Windows配布物のビルド・別PCでの起動、スマホへのインストール、ストア提出は未実施です。開催前に参加者と同じ条件で確認してください。

豆知識：localhostは「この端末」を指します。スマホで同じlocalhostのURLを開いてもPCにはつながりません。
