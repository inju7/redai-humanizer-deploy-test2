const { execSync } = require('child_process');
const fs = require('fs');
try {
  const output = execSync('git status', { encoding: 'utf-8' });
  fs.writeFileSync('git_status.txt', output);
} catch (e) {
  fs.writeFileSync('git_status.txt', e.stdout || e.message);
}
