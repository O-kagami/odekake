// 旧教材のコマンド名も、同じ編集元を使う新しい配布処理へつなぎます。
process.argv.splice(2, 0, 'extension');
await import('./prepare-distribution.mjs');
