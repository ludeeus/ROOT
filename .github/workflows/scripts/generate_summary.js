const fs = require('fs');

module.exports = ({core}) => {
    const summaries = {};
    let environment = "";
    const subDirectories = fs.readdirSync("outputdata", { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name)
    
    for (const directory of subDirectories) {
      const parsed = JSON.parse(fs.readFileSync(`outputdata/${directory}/summary.json`))
      
      if (parsed.changed_pct >= 25) {
        core.warning(`${directory} changed ${parsed.changed_pct}%!`)
        environment = "verify"
      }
    
      summaries[directory] = JSON.parse(fs.readFileSync(`outputdata/${directory}/summary.json`));
    }
    
    core.summary.addCodeBlock(JSON.stringify(summaries, null, 4), "json")
    core.summary.write()
    core.setOutput("categories", JSON.stringify(Object.keys(summaries)))
    core.setOutput("summaries", JSON.stringify(summaries))
    core.setOutput("environment", environment)
}