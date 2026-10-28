# 第2回：同じodekakeにAPIを追加し、Pagesを更新

教材：https://github.com/O-kagami/odekake

## 2ページ：今日のゴールと60分の流れ

完成するもの：前回の公開サイトに、天気API連携を追加

0–7分　自分のforkと公開URLから再開
7–17分　API・HTTP・JSON
17–24分　認証・秘密情報・Pagesの役割
24–39分　同じアプリへAPI連携を追加
39–46分　成功・失敗を確認
46–55分　commit・pushして公開サイトを更新
55–60分　同じURLで確認・提出

完了の目安：前回の持ち物と変更を残し、同じURLで天気を取得できれば完成

## 3ページ：前回のforkと公開URLから再開

① 自分／odekakeのリポジトリを開く。
② 前回のPages URLを開く。
③ PCのclone済みフォルダーを開く。
④ git status と git remote -v を確認。
⑤ node serve.mjs 01-start で起動。

前回追加した持ち物と保存を確認する。
新しいforkやリポジトリは作らない。

完了の目安：originが自分のfork。別PCなら、同じforkをcloneする

補足：未保存の変更があれば先に確認してcommitする。別PCなどでGitHub側に更新がある場合は、作業ツリーを確認してgit pull --ff-only。完成例で全体を上書きしない。

## 4ページ：編集する場所と公開する場所



### 編集する：01-start/public

前回から使っているアプリ。
名前に01があっても、
第2回はこの続きへ追加する。

app.js：API通信と画面の処理
config.js：lessonを2へ変更

### 公開する：docs

prepare-pages.mjsで更新。
前回と同じmain /docsを使う。

完成例の02-completeは参照用。
自分の変更を丸ごと置き換えない。
Pagesの設定はそのまま使う。

完了の目安：同じfork・同じ作業フォルダー・同じ公開URLで進める

## 5ページ：APIは、決まった形式の窓口

天気サービスへ「札幌の今の気温」を依頼する。
サービスは、決まった形式でデータを返す。
アプリは、そのデータを読みやすく表示する。

リクエスト ＝ こちらから送る依頼
レスポンス ＝ 相手から返る結果

完了の目安：たとえ：注文のルールがAPI仕様、注文がリクエスト、届く結果がレスポンス

## 6ページ：API仕様で見る項目

エンドポイント
どこへ送るか。

パラメーター
どの地域・どの項目を指定するか。

返り値と利用条件
JSONの形、認証、回数制限、出典。

完了の目安：この例は札幌市中心部の概略座標。現在地取得は使わない

参考：https://open-meteo.com/en/docs

## 7ページ：URLの中身

? の後ろがクエリパラメーター。複数の指定は & で区切る。

````text
https://api.open-meteo.com/v1/forecast
  ?latitude=43.06
  &longitude=141.35
  &current=temperature_2m
  &timezone=Asia%2FTokyo
````

完了の目安：表示は読みやすく改行したもの。ブラウザーへ貼るときは1行にする

参考：https://open-meteo.com/en/docs

## 8ページ：取得する項目を選ぶ

1. Open-MeteoのAPI Docsを開く。
2. Location and Timeで地域を指定。
3. Current Weatherへ移動。
4. Temperature (2 m)を選択。

まずは1項目だけ取得する。

完了の目安：現在の気温も、気象モデルに基づく値として扱う

参考：https://open-meteo.com/en/docs

## 9ページ：生成されたAPI URL

1. API Responseへ移動。
2. API URLをコピーする。
3. 新しいタブで開く。
4. 返ってきたデータを確認。

APIは、画面を作る前にも
ブラウザーから試せる。

完了の目安：取得したAPI URLと完成条件を、01-start/SPEC.mdへ追記する

参考：https://open-meteo.com/en/docs

## 10ページ：JSONを読む

JSONは、データを受け渡す形式。

キー：項目の名前。
値：その項目の中身。

current.temperature_2m が気温。
current_units.temperature_2m が単位。
current.time が値の対象時刻。

完了の目安：画面の数値は撮影時点。授業中は変わる

参考：https://open-meteo.com/en/docs

## 11ページ：APIキーとOAuth



### APIキー

サービスを呼ぶための資格情報。

誰の利用として扱うか、
どの権限を持つかに関係する。

秘密のキーはサーバー側で管理。

### OAuth

ユーザーが、アプリに
限定したアクセスを許可する仕組み。

例：カレンダーの予定を読む。

パスワードをアプリへ渡さない。

完了の目安：Open-Meteoの今回の非商用実習は、APIキー不要

参考：https://open-meteo.com/en/pricing

## 12ページ：秘密の情報を置く場所



### 配布する側

ブラウザーのJavaScript
Windowsアプリ
モバイルアプリ
拡張機能

中身を取り出される前提で考える。

### サーバー側

秘密キーは環境変数などで管理。
アプリは自分のサーバーを呼ぶ。
サーバーが外部APIを呼ぶ。

必要に応じて認証、回数制限、
利用額の上限も設定する。

完了の目安：Pagesには秘密キーを置けない。.envでも配布物へ入れば公開される

参考：https://developers.openai.com/api/reference/overview

## 13ページ：.envと.gitignore

秘密の値を保存するファイルと、Gitへ入れない設定を分ける。

````text
.env             秘密の実際の値
.env.example     値を空にした設定例

# .gitignore の例
.env
.env.*
!.env.example
node_modules/
````

完了の目安：すでにGitへ入れた秘密は、ignoreだけでは消えない。キーを失効・再発行する

## 14ページ：PagesとAPIの役割



### GitHub Pages

HTML・CSS・JSをブラウザーへ配る。

天気のボタンや表示欄を届ける。
サーバー処理や秘密キーは置かない。

### ブラウザーと外部API

JSがOpen-MeteoへHTTPSで依頼。
APIがJSONでデータを返す。
ブラウザーが値を画面に表示。

Pagesでサーバー処理が動かなくても、
外部APIを呼ぶ画面は作れる。

完了の目安：今回の非商用実習はキー不要。商用利用や利用制限は公式条件を確認

参考：https://open-meteo.com/en/pricing
https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages

## 15ページ：Codexへの実装依頼

同じforkの01-start/publicを編集する。天気のひな形は既に教材内にある。

````text
README.mdと01-start/SPEC.mdを読んでください。
前回の持ち物・表示・保存機能を残してください。
01-start/publicのAPIひな形を読み、config.jsのlessonを2にします。
Open-Meteoの仕様を確認し、気温に加えて体感温度を取得・表示します。
地域名・単位・時刻・出典と、取得中・失敗時の表示を用意してください。
キー不要のAPIをブラウザーから呼び、相対パスを維持してください。
node serve.mjs 01-start で確認し、結果と未確認点を報告してください。
````

完了の目安：SPECへ完成条件を追記して依頼。02-completeは参照用で、丸ごと置き換えない

## 16ページ：通信処理の最小イメージ

fetchは通信を行う関数。awaitで結果を待ち、JSONを読み取る。

````text
const response = await fetch(url);
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
const data = await response.json();
const temperature = data.current.temperature_2m;
````

完了の目安：HTTPエラーは、fetchが返った後もresponse.okなどで確認する

参考：https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

## 17ページ：取得結果の確認

① 札幌と東京で天気を取得する。
② 気温・体感温度・単位・時刻を確認。
③ 前回追加した持ち物をチェック。
④ 再読み込み後もチェックが残る。

右は教材の完成例。
自分の作品でも各項目を確かめる。

完了の目安：通信失敗後も再試行できることを確認する

参考：https://open-meteo.com/en/docs

## 18ページ：入力エラーの実例

緯度に999を指定した例。
APIがエラーと理由を返す。

確認すること
どの入力が問題か。
HTTPの状態は何か。
利用者へ何を表示するか。

完了の目安：エラー文は原因を知る手がかり。隠して成功扱いにしない

参考：https://open-meteo.com/en/docs

## 19ページ：よく使うHTTPステータス



### 成功と入力の問題

200　成功
400　入力などの不備
401　認証が必要・無効
403　アクセスを許可しない
404　対象が見つからない

### 回数制限とサーバー

429　リクエストが多すぎる
500番台　サーバー側の問題

ネットワーク切断では、
HTTP応答自体が返らない場合も。

完了の目安：失敗時に無限に再送せず、理由を確認する

参考：https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

## 20ページ：CORSと通信場所

Pagesから別のAPIへ通信する際も、ブラウザーの制限を受ける。
APIの仕様とエラーから、ブラウザーから呼べるかを確認する。

今回の実習は、キー不要のOpen-Meteoへ直接通信する。
秘密キーやサーバー処理が必要な連携は、第3回へ進める。

CORSの設定は、ユーザー認証の代わりにはならない。

完了の目安：画面を配る場所はGitHub Pages。天気データを返すのは外部API

参考：https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS

## 21ページ：不具合を伝える依頼文

感想ではなく、再現する操作と実際の結果を伝える。

````text
操作：東京を選び、「天気を取得」を押しました。
期待：東京の気温と時刻が表示されること。
実際：取得中の表示から進みません。
エラー：ここに秘密情報を除いたエラー全文を貼ります。

原因を確認し、最小限の変更で修正してください。
成功時と失敗時を確認し、結果を報告してください。
````

完了の目安：画面写真も添える。鍵・トークン・個人情報は除く

## 22ページ：READMEに連携と更新内容を記録

同じREADMEへ、天気機能の使い方を追記する。
使用API、送る地域の座標、受け取る情報を記録。
出典と利用条件、失敗時の再試行方法を添える。
前回の公開URLを、そのまま作品URLとして使う。

01-start/SPEC.mdの完成条件も更新する。
次のページで、公開用docsを作り直してpushする。

完了の目安：自分の持ち物・デザイン・READMEの変更が残っていることを確認

## 23ページ：同じPagesサイトを更新する

教材ルートで実行する。コードと公開用docsの両方をcommit・pushする。

````text
node prepare-pages.mjs
git status
git diff
git add 01-start/public 01-start/SPEC.md README.md docs
git diff --cached
git commit -m "天気APIと体感温度を追加"
git push
````

完了の目安：Pagesは前回のmain /docsのまま。push後、Actionsの完了を待つ

補足：prepare-pages.mjsは更新した01-start/publicをdocsへコピーする。docsを直接編集すると次のコピーで上書きされるため、編集元は01-start/publicに統一。

参考：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 24ページ：前回と同じURLで最終確認

① Actionsで公開処理の成功を確認。
② 前回のPages URLを開き直す。
③ 気温・体感温度を取得する。
④ 前回の持ち物と保存も確認する。
⑤ 別端末でも表示とAPI通信を確認。

提出：同じ公開URL、更新後の画面、
今回のcommit、APIの送受信の説明。

完了の目安：古い表示ならdocsの差分・公開処理・再読み込みを確認

補足：スライドの写真は講師用教材リポジトリの実際のPages設定。受講者は自分のforkのActionsと公開URLを確認する。localhostとPagesは保存領域が異なり、localhostのチェックがそのまま公開サイトへ移るわけではない。

## 25ページ：発展：API・Webhook・MCP



### API

こちらから呼び出す窓口。

例：天気を取得する。

### Webhook

出来事が起きたとき、
相手から通知を受け取る。

例：決済完了の通知。

### MCP

AIのアプリが外部の道具や
情報源と連携するための方式。

自作アプリのAPIとは、
使う場面を分けて考える。

完了の目安：次の課題：連携したいサービスの認証方式と必要権限を調べる

## 26ページ：Plusの利用とAPIの料金

授業ではChatGPT PlusのCodexで開発する。
Plusの利用上限に備えて、復旧版も用意する。

自作アプリから通常の有料APIを呼ぶ場合は、
別途そのサービスの利用契約と料金を確認する。

APIの料金、サーバーの料金、DBの料金を分けて把握する。

完了の目安：今回の必須実習は、有料AI APIを使わず進められる

参考：https://learn.chatgpt.com/docs/pricing
https://developers.openai.com/api/docs/pricing

