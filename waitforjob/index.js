const github = require('@actions/github');
const core = require('@actions/core');

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const target = "job1";
let conclusion;
let status;
while (status !== "completed") {
  await timeout(5000)
  const res = await github.request('GET /repos/{owner}/{repo}/commits/{ref}/check-runs', {
    owner: 'ludeeus',
    repo: 'ROOT',
    ref: '${{github.sha}}'
  });
  conclusion = res.data.check_runs.find((res) => res.name = target).conclusion;
  status = res.data.check_runs.find((res) => res.name = target).status;  
}

console.log(status, conclusion);
if (conclusion !== "success") {
  core.setFailed(conclusion);
}


async function run() {
    const token = core.getInput('github-token');
    const target = core.getInput('target');
    const timeout = core.getInput('timeout');
    const retry_limit = core.getInput('retry-limit');

    const octokit = github.getOctokit(token)

    let conclusion;
    let status;
    let tries = 0

    while (status !== "completed" || tries > retry_limit) {
        await timeout(5000)
        const result = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}/check-runs', {
          owner: 'ludeeus',
          repo: 'ROOT',
          ref: '${{github.sha}}'
        });

        conclusion = result.data.check_runs.find((check) => check.name = target).conclusion;
        status = result.data.check_runs.find((check) => check.name = target).status;
        tries += 1
    }

    console.log(status, conclusion);
    if (conclusion !== "success") {
      core.setFailed(conclusion);
    }
  }
  
  run();