# 第1回：GitHub・Markdown・GitHub Pages

教材：https://github.com/O-kagami/odekake

## 2. 今日のゴールと60分の流れ

完成するもの：自分のURLで使える持ち物アプリ

0–8分　完成例、言語、localhost
8–18分　新規作成・fork・clone
18–35分　MarkdownとREADMEの演習
35–45分　Codexで変更と動作確認
45–55分　GitHub Pagesで公開
55–60分　別の端末で確認・提出

完了の目安：新規作成とforkの両方を体験し、公開URLを持ち帰る

## 3. 授業前の準備

① PCでChatGPT Plusへログイン。
② Codex、Git、Node.jsを準備する。
③ GitHubへログインし、Git認証を済ませる。
④ 公開教材 O-kagami/odekake を確認する。
⑤ アプリの起動練習は事前に済ませる。

授業中にforkし、自分のコピーをcloneする。

完了の目安：公開forkを使う。氏名・秘密・個人情報を教材へ書かない

## 4. 3回かけて育てる作品

第1回
持ち物アプリを変更し、Pagesで公開。

第2回
地域の天気をAPIから取得。

第3回
サーバー・DBへ進み、形式を選んで配布。

完了の目安：画面と説明文は、自分の用途に変更できる

## 5. 選べる配布先



### Windows

独立したウィンドウで使う。

Electronのひな形を利用。
配布ファイルを作り、別のPCで確認。

### モバイル

スマホのホーム画面から使うPWA。

WebのURLを共有。
ストアへの掲載とは別。

### 拡張機能

ブラウザーのボタンから開く。

ZIPと導入手順を配布。
授業内は開発者向け導入。

完了の目安：今回は1コースを選ぶ。ストア審査完了は必須に含めない

参考：https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable

## 6. アプリを構成するファイル

拡張子は、ファイルがどの形式かを知る手がかり。

````text
public/
  index.html    画面の構造
  style.css     色・余白・配置
  app.js        クリック時の処理
  config.js     教材の設定
README.md       目的と使い方
SPEC.md         作りたい機能と完成条件
````

完了の目安：Codexで index.html と app.js を開き、役割の違いを説明する

## 7. 構造・見た目・動き



### HTML・Markdown

文書の構造を表す。

HTML：見出しやボタン
Markdown：読みやすい文書

どちらもマークアップ言語。

### CSS

見た目を指定する。

文字の色
余白
画面内の配置
スマホ向けの幅

### JavaScript

処理を記述する。

ボタンを押すと保存。
APIからデータを取得。
条件によって表示を変更。

完了の目安：たとえ：HTMLは骨組み、CSSは装い、JavaScriptは動作

## 8. JS・TS・Python・Cの位置づけ



### 今回使うもの

JavaScript（.js）
画面の動きとAPI通信。

TypeScript（.ts）
JavaScriptに型の確認を追加。
通常はJSへ変換して実行。

### 用途を知るもの

Python（.py）
自動化、データ処理、サーバー。

C（.c）
OSや組み込みなどでも使う。

今回、全言語の文法は覚えない。

完了の目安：AIが提案した言語に対して「どこで動くか」を確認する

## 9. localhostと公開URL



### 自分のPCで動かす

http://localhost:4173

localhostは、その端末自身。
4173はアプリの入口の番号。

このURLをスマホで開くと、
スマホ自身へ接続しようとする。

### インターネットで使う

https://自分の公開先

別の人の端末からも利用できる。

第1回：GitHub Pagesで公開。
第3回：サーバーとDBも使う。

完了の目安：豆知識：同じlocalhostという文字でも、端末ごとに指す場所が違う

## 10. GitとGitHub

Git
ファイルの変更履歴を管理する仕組み。

GitHub
リポジトリをオンラインで保管し、
共有・レビューするサービス。

リポジトリには、ファイルと
変更の履歴をまとめて保存する。

完了の目安：「ファイルを保存」と「履歴に記録」は別の操作

参考：https://github.com/octocat/Hello-World

## 11. 練習用リポジトリを新規作成

① GitHubで「New repository」。
② 名前を github-practice にする。
③ Publicを選び、READMEを追加。
④ 「Create repository」を押す。

これは新規作成を学ぶ練習用。
アプリ演習は、次にforkする
odekakeで行う。

完了の目安：自分のアカウント名／github-practice が表示されれば完了

参考：https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository

## 12. 新規作成・fork・cloneの違い



### New repository

GitHubに新しい保管場所を作る。

練習用：github-practice
READMEから始める。

### fork

既存の教材を、自分のGitHubへ
履歴ごとコピーする。

演習用：自分／odekake
元との関係も残る。

### clone

GitHubのリポジトリを
自分のPCへコピーする。

自分のforkをcloneして
Codexで編集する。

完了の目安：作成練習用と、アプリ演習用の2つを混同しない

## 13. 教材odekakeをforkする

① github.com/O-kagami/odekake を開く。
② 右上の「Fork」を押す。
③ Ownerに自分を選ぶ。
④ Repository nameはodekake。
⑤ mainのみをコピーして作成する。

自分／odekake と
forked from O-kagami/odekakeを確認。

完了の目安：この教材は公開リポジトリ。自分のforkも公開になる

参考：https://docs.github.com/en/pull-requests/how-tos/work-with-forks/fork-a-repo
https://github.com/O-kagami/odekake

## 14. 自分のforkをcloneする

① 自分の odekake で「Code」。
② HTTPSのURLをコピー。
③ CodexへURLと保存先を伝え、clone。
④ clone先をCodexで開く。
⑤ node serve.mjs 01-start で起動。
⑥ http://localhost:4173 を開く。

元の O-kagami/odekake と区別する。

完了の目安：git remote -v のoriginが自分のGitHub URLならOK

参考：https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository

## 15. Markdownは文書の構造を表す

1. 「Markdownの入力」に文章を書く。
2. # の数で見出しの階層を変える。
3. 「プレビューを更新」を押す。

# は大きな見出し。
## は、その中の見出し。

記号の後に半角スペースを入れる。

完了の目安：練習室は別ターミナルで node serve.mjs lab 4174 を実行し、http://localhost:4174 を開く。作品名を自分で考えた名前へ変更する。

参考：https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

## 16. 箇条書きと完成条件

- は、項目を並べる記号。
1. は、手順を並べる記号。

- [ ] は、未完了の項目。
- [x] は、完了した項目。

「完成した」を判断できる条件を、
チェックリストにする。

完了の目安：「動く」だけでなく、押した後の結果まで書く

参考：https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

## 17. 太字・リンク・画像

強調は、読んでほしい短い部分だけ。リンクと画像は参照先を示す。

````text
**必ず保存する**

[Open-Meteo](https://open-meteo.com/)

![アプリの画面](images/screenshot.png)

`README.md`
````

完了の目安：相対パスは、文書から見たファイルの場所。画像ファイルも一緒に保存する

参考：https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

## 18. コードブロック

バッククォート3つで囲むと、
コードやコマンドをまとめて示せる。

開始行に js や bash を付けると、
対応した画面では色分けできる。

AIへの依頼でも、指示とコードを
分けると読み違いを減らしやすい。

完了の目安：通常の文章と、実行する文字列を区別する

参考：https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks

## 19. 表とMarkdownの表示差

比較するときは表が便利。表やチェックリストの対応範囲は画面によって違う。

````text
| ファイル | 役割 |
| --- | --- |
| README.md | 目的と使い方 |
| SPEC.md | 機能と完成条件 |
| AGENTS.md | AIへの作業ルール |
````

完了の目安：最終的に使うGitHubなどで、表示を確認する

参考：https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax

## 20. 実習：SPEC.mdに要望を書く

Codexで01-start/SPEC.mdを開き、次の項目を自分の言葉に変える。

````text
# 作りたいアプリ
## 誰のため
外出前の自分
## 追加する機能
持ち物に「学生証」を追加する
## 完成条件
- [ ] 学生証をチェックできる
- [ ] 再読み込み後もチェックが残る
````

完了の目安：実習5分。変える機能は、まず1つに絞る

## 21. README.mdは作品の入口

初めて見る人に伝える内容。

何をするアプリか。
誰が、いつ使うか。
どう起動するか。
何を操作するか。
どこにデータを保存するか。

画面写真と、未対応の機能も添える。

完了の目安：実習としてREADMEへ作品名・使い方・完成条件を追記し、GitHubで表示を確認する。

参考：https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes

## 22. 編集・commit・pushの違い



### PCでの作業

編集・保存
ファイルの内容を変える。

git diff
何が変わったかを見る。

commit
変更に説明を付けて記録する。

### GitHubとの同期

push
PCの履歴をGitHubへ送る。

pull
GitHub側の変更を取り込む。

Pages設定後は、公開元への
pushでサイトが更新される。

完了の目安：GitHubへpushしただけで、必ずWeb公開されるわけではない

## 23. 変更差分の読み方

赤い行：削除した内容。
緑の行：追加した内容。

「何を変えたか」を説明できるか
見てからcommitする。

APIキーや不要なファイルが
含まれていないかも確認する。

完了の目安：豆知識：改行だけでも、変更として記録される

参考：https://github.com/octocat/Hello-World/commit/762941318ee16e59dabbacb1b4049eec22f0d303

## 24. Codexに渡す最初の依頼

forkをcloneしたフォルダーで実行する。教材の再コピーは不要。

````text
README.mdと01-start/SPEC.mdを読んでください。
01-start/publicに、SPECで指定した機能を追加してください。
既存のチェック保存と、相対パスの参照を維持してください。
変更するファイルと理由を説明してから実装してください。
node serve.mjs 01-start で動作確認してください。
確認できたことと未確認のことを報告してください。
README.mdに自分の作品の使い方を追記してください。
````

完了の目安：「作って」で終わらず、制約と完成条件まで伝える

## 25. 動作確認のチェックポイント

1. 自分で追加した項目が見える。
2. チェックを付けられる。
3. 再読み込みしても残る。
4. 他の項目も引き続き使える。

問題があれば、操作と結果を
そのままCodexへ伝える。

完了の目安：「できた」という返答に加えて、画面で確かめる

## 26. Pagesへ公開するファイル

公開用のdocsへ、第1回の画面ファイルだけをコピーする。

````text
node prepare-pages.mjs

docs/
  index.html
  style.css
  app.js
  config.js
  .nojekyll
````

完了の目安：HTML・CSS・JSを公開。Python・サーバー処理・DBはPagesでは動かさない

## 27. 変更を履歴に残す

先に node prepare-pages.mjs を実行。差分と公開ファイルを確認してから記録する。

````text
git status
git diff
git add 01-start/public/app.js 01-start/SPEC.md
git add README.md docs
git commit -m "持ち物アプリを変更しPages公開を準備"
git push
````

完了の目安：originが自分のforkであることを確認。変更した他のファイルも対象に加える

## 28. GitHub Pagesの公開設定

① 自分のforkで「Settings」。
② 左の「Pages」を開く。
③ Source：Deploy from a branch。
④ Branch：main。
⑤ Folder：/docs を選び「Save」。

処理の完了後、Pagesに表示される
公開URLを開く。

完了の目安：URL例：https://自分のID.github.io/odekake/

参考：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 29. 公開URLで完成を確かめる

① Settings → PagesのURLを開く。
② 自分の追加した項目を確認する。
③ スマホや別の端末でも開く。
④ READMEへ公開URLを追記する。

提出：新規作成したリポジトリURL、
forkのURL、PagesのURL、画面写真。

完了の目安：履歴の保存とWeb公開を、両方確認する

参考：https://github.com/octocat/Hello-World/commits/master/

## 30. つまずいたときの戻り方

404：Pagesの公開元がmain /docsか、docs/index.htmlがあるか。
公開待ち：Actionsでpages build and deploymentの結果を確認。
見た目が崩れる：CSS・JSの相対パスとファイル名を確認。
変更が出ない：prepare-pagesを再実行し、docsもcommit・push。
push失敗：ログインとoriginが自分のforkか確認。

復旧版は01-complete。自分の変更を残し、講師と切り替える。

完了の目安：公開URLへ反映されるまで時間がかかる場合がある。待ち時間はREADMEを整える

## 31. 発展：branch・PR・merge



### 変更を分ける

branch
別の変更を試す作業の枝。

mainを動く状態で保ち、
新機能は別の枝で試せる。

### 確認して取り込む

PR（Pull Request）
変更を確認してもらう提案。

merge
確認した変更を取り込む。

forkはGitHub上に作る別コピー。

完了の目安：豆知識：forkは「分岐」の意味。自分のコピーから変更を提案できる

