const github = require('@actions/github');
const core = require('@actions/core');

function asyncTimeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
        await asyncTimeout(timeout)
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