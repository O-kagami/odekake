// node prepare-distribution.mjs desktop|extension https://自分の公開ホスト
// Webの編集元を維持し、配布用のコピーにだけ公開APIのURLを設定します。
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const [target, input] = process.argv.slice(2);
if (!['desktop', 'extension'].includes(target) || !input) {
  throw new Error('desktop または extension と、HTTPSの公開URLを指定してください。');
}
const url = new URL(input);
if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
  throw new Error('https://ホスト名 の形式で指定してください。パスや秘密情報を含めません。');
}
const root = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(root, '../01-start/public');
const output = path.resolve(root, 'dist', target);
const expectedParent = path.resolve(root, 'dist');
if (path.dirname(output) !== expectedParent) throw new Error('配布先の確認に失敗しました。');
await fs.access(path.join(source, 'index.html'));
await fs.access(path.join(source, 'config.js'));
// dist内の固定された生成物だけを作り直し、削除済みファイルの混入を防ぎます。
await fs.rm(output, {recursive:true, force:true});
const publicDir = target === 'desktop' ? path.join(output, 'public') : output;
await fs.cp(source, publicDir, {recursive:true});
await fs.appendFile(path.join(publicDir, 'config.js'), '\nwindow.COURSE_CONFIG.apiBase = ' + JSON.stringify(url.origin) + ';\n');
if (target === 'extension') {
  const manifest = JSON.parse(await fs.readFile(path.join(root, 'extension-manifest.json'), 'utf8'));
  manifest.host_permissions = ['https://api.open-meteo.com/*', url.origin + '/*'];
  await fs.writeFile(path.join(publicDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  await fs.appendFile(path.join(publicDir, 'style.css'), '\nbody{width:380px}\n');
}
console.log('生成しました: ' + output);
console.log('天気・体感温度・自分の持ち物・DB取得を配布先でも確認してください。');
