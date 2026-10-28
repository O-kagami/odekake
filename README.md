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
- 01-start：全3回で続けて編集するアプリとSPEC.md。
- 01-complete：第1回の復旧用。
- 02-complete：気温・体感温度のAPI連携を読む完成例。自分の作品を上書きしない。
- 03-release：公開DB・デプロイ・配布の道具。publicは素材見本で、自分の作品は01-start/public。
- docs：第1・2回のPages公開用。prepare-pages.mjsで同じ編集元から更新。
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

## 第2回：同じforkと同じ公開URLを育てる

新しいリポジトリやforkは作りません。第1回にcloneした自分のodekakeを開き、**01-start/publicを続けて編集**します。

1. 自分のPages URLで前回の作品を確認し、git statusとgit remote -vで作業状態・originを確認します。別PCなら同じforkをcloneします。
2. 未保存の変更を整理してから、01-start/SPEC.mdにAPIのURL、送受信データ、追加機能、完成条件を追記します。
3. 01-start/publicには気温取得のひな形が入っています。config.jsのlessonを2へ変更し、Codexで体感温度も取得・表示する機能を追加します。
4. currentパラメーターはtemperature_2m,apparent_temperature。気温・体感温度・単位・時刻・地域名・出典を表示します。取得中・失敗・再試行も確認します。
5. node serve.mjs 01-startで起動し、前回の持ち物・表示の変更・チェック保存も維持できているか確認します。
6. READMEの使い方とAPI情報を更新します。次を実行して、同じPagesサイトを更新します。

```sh
node prepare-pages.mjs
git status
git diff
git add 01-start/public 01-start/SPEC.md README.md docs
git diff --cached
git commit -m "天気APIと体感温度を追加"
git push
```

7. Pages設定は前回のmain /docsをそのまま使います。Actionsの公開処理が完了したら、**前回と同じURL**を開き直し、API通信と持ち物を確認します。
8. 同じ公開URL・更新した画面・今回のcommit・APIで送受信する情報を提出します。

### 完成条件
- [ ] 前回の持ち物・自分の表示変更が残っている
- [ ] 札幌と東京で気温・体感温度・単位・時刻が出る
- [ ] 通信失敗後に再試行できる
- [ ] docsを更新してpushした
- [ ] 前回と同じPages URLで更新が見える

Pagesはファイルを配り、利用者のブラウザーがOpen-Meteoへ直接問い合わせます。秘密キーは使いません。今回の無料APIは非商用の教材実習として利用し、利用制限・出典表示等は[公式条件](https://open-meteo.com/en/pricing)を確認します。

### 復旧と更新の注意
02-completeは差分を読むための完成例です。フォルダーを丸ごと上書きせず、自分の持ち物や見た目を残して必要箇所だけ反映してください。すでにforkした参加者は、この教材更新のために再forkする必要はありません。この手順は従来のprepare-pages.mjsでも使えます。

ローカルの保存領域とPagesの保存領域は別です。localhostで付けたチェックがPagesへ自動で移るわけではありません。同じURLの公開版を更新したときも、localStorageのキーと持ち物名を維持します。

公開画面が古いときは、docsのcommit、Actionsの結果、再読み込みの順で確認します。画面は開くがAPIが失敗する場合は、通信先、API応答、CORS、利用制限を確認します。

## 第3回：同じodekakeにDBを追加し、公開・配布する

前提は第2回のAPI連携が動き、自分のforkのPagesを更新済みであることです。**同じfork、同じclone先、同じ01-start/publicを使います。** 持ち物の追加、気温・体感温度、チェック保存、見た目の変更を残してください。

### 事前準備
Cloudflareのアカウントと利用条件を確認し、03-release内でnpm installを済ませます。配布先を1つ選び、Windowsならdesktopでnpm install --save-dev electron electron-builderを実行します。OSやネットワークの準備と大きなダウンロードは授業前に済ませます。OG画像の素材と、配布先の確認用端末も用意します。

古い教材をfork済みでprepare-release.mjsやprepare-distribution.mjsがない場合は、[第3回への移行](UPGRADE-LESSON3.md)を先に実施してください。新しいforkの作成や完成例での上書きは不要です。

### 同じ作品への追加
1. git status、git remote -vを確認し、第2回の動く状態をcommitして残します。
2. 教材ルートで次を実行。不足するPWA素材だけを追加し、既存のHTML・JS・CSSは維持します。

```sh
node prepare-release.mjs
node serve.mjs 01-start
```

3. Codexへ下記を依頼し、01-start/SPEC.mdにも完成条件を追記します。

```text
01-start/publicを続けて編集します。第2回の気温・体感温度、
自分の持ち物・見た目・localStorageのキーを維持してください。
config.jsのlessonを3にして、既存のスポット取得処理を確認してください。
03-release/worker.jsとschema.sqlの公開用読み取りAPIを使います。
wrangler.jsoncのassets.directoryは../01-start/publicにします。
index.htmlのheadへ次を追加し、manifestの名前を自分の作品に合わせます。
<link rel="manifest" href="manifest.webmanifest">
WebのapiBaseは空欄。local-sampleをDB接続成功として扱わないでください。
前回の機能と、取得中・成功・失敗・再試行の表示を確認してください。
```

教材には非表示のスポット取得ひな形が入っています。今回はそれを読み、画面を有効化して、実際のクラウドDBへ接続します。03-release/publicの見本で自分の作品を丸ごと入れ替えません。

### DBとデプロイ
03-release/schema.sqlへ公開用スポットを1件追加します。idは未使用の値を使います。INSERT OR IGNOREは同じidの行を更新しないので、更新には明示的なUPDATEが必要です。ブラウザーから誰でも書き込めるAPIは作りません。

03-release内で実行します。

```sh
npx wrangler login
npx wrangler d1 create odekake-db
```

作成済みなら再作成せず同じDBを使います。表示されたdatabase_idをwrangler.jsoncへ設定。bindingはDB、database_nameはodekake-db。assets.directoryは../01-start/publicです。

```sh
npx wrangler d1 execute odekake-db --remote --file=schema.sql
npx wrangler d1 execute odekake-db --remote --command="SELECT * FROM places"
npx wrangler deploy
```

Workersの新しいHTTPS URLをREADMEへ記録します。/api/placesのsourceがd1で、自分の追加スポットが出ること、画面から取得できること、気温・体感温度・持ち物も動くことを確認します。sourceがlocal-sampleならローカルサンプルであり、D1接続の確認にはなりません。

GitHubのリポジトリと作品は同じですが、公開URLはPagesからWorkersへ変わります。旧docsは第2回の版として残します。第3回ではprepare-pages.mjsを実行しません。新旧URL・Windows・拡張機能は保存領域が違い、以前のチェック状態は自動移行されません。

### SEO・OG画像と再公開
編集先は01-start/public/index.htmlです。既存のtitle、description、og:title、og:description、og:typeを自分の作品に合わせます。canonical、og:url、og:imageには新しいWorkers URLを設定し、同じタグを重複させません。01-start/public/og.pngへ制作した画像を保存します。教材の目安は1200×630px。実際の寸法と文字の読みやすさも確認します。

教材ルートで保存してから再公開します。

```sh
git status
git diff
git add 01-start/public 01-start/SPEC.md 03-release README.md prepare-release.mjs
git diff --cached
git commit -m "DB連携と公開・配布の準備を追加"
git push
cd 03-release
npx wrangler deploy
```

git pushはGitHubへの保存です。この教材のWorkers公開はwrangler deployで行います。公開ページ、/api/places、/og.pngを開き、共有プレビューも確認します。検索の掲載時期・順位は完成条件にしません。共有先に古い画像が残る場合はキャッシュも確認します。

### 配布：1つ選ぶ
Windowsと拡張機能は**01-start/publicから配布用コピーを生成**します。WebのapiBaseを変えず、コピーへ公開URLを設定します。下記のhttps://example.comは自分のWorkersのホスト名へ置き換えてください。パス・クエリ・秘密情報は含めません。

#### Windows
03-release内で実行します。

```sh
node prepare-distribution.mjs desktop https://example.com
cd desktop
npm run start
npm run pack
```

desktop/dist内の配布ファイルを別のWindows PCで起動します。天気・体感温度・DB・自分の持ち物を確認します。起動方法と通信先をREADMEへ記載。署名や端末ポリシーの警告は講師と確認し、保護機能を無効にして進めません。更新時は配布用コピーを再生成し、再ビルドします。

#### モバイルPWA
01-start/public/manifest.webmanifestの名前とアイコンを編集します。index.htmlのmanifestリンク、sw.js、192px・512pxアイコンを確認し、03-releaseでnpx wrangler deploy。スマホで**新しいWorkers URL**を開き、共有やメニューからホーム画面へ追加します。URLと追加手順を配布し、アイコンからの起動と前回の機能・DB取得を確認します。OS・ブラウザーによって操作や対応範囲が異なります。天気・DB取得には通信が必要です。PWA配布とネイティブアプリのストア掲載は別の工程です。

#### 拡張機能
03-release/extension-manifest.jsonの作品名を編集し、03-release内で実行します。

```sh
node prepare-distribution.mjs extension https://example.com
```

dist/extensionへ同じアプリを生成します。host_permissionsはOpen-Meteoと指定した自分の公開ホストだけです。Chromeはchrome://extensions、Edgeはedge://extensionsを開き、開発者向け読み込みでこのdist/extensionを選びます。天気・体感温度・DB・持ち物を確認し、フォルダーをZIPにして解凍・読み込み手順を添えます。更新時は再生成し、管理画面で再読み込みします。授業内のZIP配布は開発者向けで、ストア掲載には登録や審査が必要です。

### 第3回の完成条件
- [ ] 同じfork・01-start/publicを使い、前回の機能と自分の変更が残っている
- [ ] 新しい公開URLで/api/placesのsourceがd1となり、自分の追加スポットが出る
- [ ] title・description・canonical・OG情報が新URLに合っている
- [ ] 公開OG画像と共有時の表示を確認した
- [ ] 選んだ配布先で相手が起動し、天気・体感温度・DBを取得できる
- [ ] READMEへ新旧URL・導入手順・確認環境・未確認点を記録し、commit・pushした

## データと確認範囲
チェックはブラウザーのlocalStorageに保存。天気取得時は選んだ地域の座標をOpen-Meteoへ送ります。公開DBは公開用スポット情報のみを読み取ります。認証機能はありません。CORSはアクセス認証ではありません。

チェック保存、公開天気API、ローカルのサンプルデータ表示をブラウザーで確認しています。ローカルの/api/placesはsourceがlocal-sampleで、D1接続ではありません。第1回のGitHub Pages公開、表示とチェック保持は確認済みです。第3回のCloudflareへの公開、Windows配布物のビルド・別PCでの起動、スマホへのインストール、ストア提出は未実施です。開催前に参加者と同じ条件で確認してください。

豆知識：localhostは「この端末」を指します。スマホで同じlocalhostのURLを開いてもPCにはつながりません。
