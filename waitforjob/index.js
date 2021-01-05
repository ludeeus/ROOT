const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
    const octokit = getOctokit(core.getInput())
    try {
      const ms = core.getInput('milliseconds');
      core.info(`Waiting ${ms} milliseconds ...`);
  
      core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
      await wait(parseInt(ms));
      core.info((new Date()).toTimeString());
  
      core.setOutput('time', new Date().toTimeString());
    } catch (error) {
      core.setFailed(error.message);
    }
  }
  
  run();