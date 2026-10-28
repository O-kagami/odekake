// 教材ルートで実行。既存の作品には不足しているPWA素材だけを追加します。
import fs from 'node:fs/promises';
import { constants } from 'node:fs';
const source = new URL('./03-release/public/', import.meta.url);
const target = new URL('./01-start/public/', import.meta.url);
await fs.access(new URL('index.html', target));
for (const name of ['manifest.webmanifest', 'sw.js', 'icon-192.png', 'icon-512.png']) {
  try {
    await fs.copyFile(new URL(name, source), new URL(name, target), constants.COPYFILE_EXCL);
    console.log('追加: ' + name);
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
    console.log('既存の変更を保持: ' + name);
  }
}
console.log('次にCodexで01-start/publicのlessonを3にし、manifestリンクとDB表示を確認してください。HTML・JS・CSSは上書きしていません。');
