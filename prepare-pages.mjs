import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 第1・2回で育てる同じアプリを公開用フォルダーへコピーします。
const root = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(root, '01-start', 'public');
const destination = path.join(root, 'docs');
await fs.mkdir(destination, { recursive: true });
for (const name of ['index.html', 'style.css', 'app.js', 'config.js']) {
  await fs.copyFile(path.join(source, name), path.join(destination, name));
}
await fs.writeFile(path.join(destination, '.nojekyll'), '');
console.log('docs に更新したアプリをコピーしました。内容を確認してcommit・pushしてください。');
