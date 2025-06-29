// save this as fix-layout.js в корне проекта
import fs from "fs";
import path from "path";

const rootDir = process.cwd(); // текущая папка запуска скрипта

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile()) {
      // Только текстовые файлы - например .md, .njk, .html, .js и т.п.
      if (/\.(md|njk|html|js|json|yaml|yml)$/.test(entry.name)) {
        let content = fs.readFileSync(fullPath, "utf-8");
        if (content.includes("layout: layouts/base.njk")) {
          const replaced = content.replace(/layout: base\.njk/g, "layout: layouts/base.njk");
          fs.writeFileSync(fullPath, replaced, "utf-8");
          console.log(`Fixed layout in: ${fullPath}`);
        }
      }
    }
  }
}

walkDir(rootDir);
console.log("Done!");
