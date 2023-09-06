const fs = require('fs');
const yaml = require('yaml');
const path = require('path');

try {
  const file = fs.readFileSync(path.resolve(__dirname, '../riga-tool.config.yml'), 'utf8');
  const config = yaml.parse(file);
  const data = `export default ${JSON.stringify(config, null, 2)};`;
  fs.writeFileSync(path.resolve(__dirname, '../src/lib/components/riga-tool.config.ts'), data);
} catch (e) {
  console.error(e);
}
