# 以前のforkを第3回へつなぐ

新しいforkを作り直す必要はありません。事前準備として、動く状態をcommitし、同じclone先でCodexへ次を依頼します。

```text
このforkの01-start/publicに、第1・2回の自分の変更があります。
それらとREADME、SPECの自分の記述を維持してください。
教材 https://github.com/O-kagami/odekake の最新の第3回手順を確認し、
prepare-release.mjsと03-release/prepare-distribution.mjsを追加してください。
wrangler.jsoncのassets.directoryだけを../01-start/publicへ変更し、DB設定は保持。
desktop/main.cjsの開発時の読込先を../dist/desktop/publicへ変更。
desktop/package.jsonのextraResources.fromも../dist/desktop/publicへ変更。
既存の作品名・バージョン・依存パッケージは保持してください。
旧prepare-extension.mjsも新しい生成処理へ接続してください。
差分を見せ、前回のアプリを上書きしていないことを確認してください。
```

第3回の公開先と配布手順を自分のREADMEへ追記します。元教材全体を上書きしたり、03-release/publicで自分の画面を置き換えたりしません。
