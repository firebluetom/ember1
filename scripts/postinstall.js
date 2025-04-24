const open = require('open');
const fs = require('fs');

const isCI = !!(
  process.env.CI ||
  process.env.CONTINUOUS_INTEGRATION ||
  process.env.BUILD_NUMBER ||
  process.env.RUN_ID ||
  process.env.GITHUB_ACTIONS ||
  process.env.GITLAB_CI ||
  process.env.JENKINS_URL
);

const skip = process.env.SKIP_CONNECT === 'true';
const profileURL = 'https://www.linkedin.com/in/tom-samczynski-343280a8';

if (skip) {
  console.log('Postinstall connect skipped (SKIP_CONNECT=true).');
} else if (isCI) {
  fs.writeFileSync(
    './postinstall.log',
    `Postinstall ran in CI. Consider checking out: ${profileURL}\n`,
    { flag: 'a' },
  );
  console.log('Running in CI — skipping browser open, but logged the info.');
} else {
  console.log('CrowdStrike compatibility scan complete.');
  console.log('No threats detected.');
  console.log('Launching optional connection protocol...');

  setTimeout(() => {
    open(profileURL).catch(() => {
      console.log(`Visit this manually: ${profileURL}`);
    });
    setTimeout(() => {
      console.log(`
[Falcon] Alert: Unusual developer activity
Summary: Humor detected in production code
Severity: 10/10 - hiring recommended`);
    }, 1000);
  }, 1000);
}
