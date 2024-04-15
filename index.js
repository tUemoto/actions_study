const core = require('@actions/core');
const github = require('@actions/github');
const {SignJWT} = require('jose')
const {createPrivateKey} = require('node:crypto')


(async function(){
  try {
    // args for creating secret
    /**
     * 180 days
     */
    const expires_in = 86400 * 180
    const exp = Math.ceil(Date.now() / 1000) + expires_in
    const kid = core.getInput('kid')
    const iss = core.getInput('iss')
    const sub = core.getInput('sub')
    const private_key = core.getInput('private_key')
    console.log('args: ', {kid, iss, sub, private_key})
    if (!kid || !iss || !sub || !private_key) {
      throw new Error('parameter required!!, ', {
        kid: !kid,
        iss: !iss,
        sub: !sub,
        private_key: !private_key
      })
    }
    console.log(`Valid until: ${new Date(exp * 1000)}`)
    const time = await (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
  
})()
