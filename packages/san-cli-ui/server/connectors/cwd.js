/**
 * @file 设置/获取cwd
 * @author jinzhan
 */

const fs = require('fs');
const {error} = require('san-cli-utils/ttyLogger');
const {CWD_CHANGED} = require('../utils/channels');
const {normalizeDir} = require('../utils/fileHelper');

class Cwd {
    constructor() {
        this.cwd = process.cwd();
    }
    get() {
        return this.cwd;
    }
    set(value, context) {
        value = normalizeDir(value);
        if (!fs.existsSync(value)) {
            return;
        }
        this.cwd = value;
        context.pubsub.publish(CWD_CHANGED, {
            cwdChanged: value
        });
        try {
            process.chdir(value);
        }
        catch (err) {
            error(`chdir: ${err}`);
        }
    }
}

module.exports = new Cwd();
