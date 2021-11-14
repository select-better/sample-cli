#!/usr/bin/env node
// mac linux 除了上面的命令，还要输入文件的读写权限 chmod u+x cli.js 或者 chmod 755 cli.js
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path')
const ejs = require('ejs')

inquirer.prompt([
    {
        type:'input',
        name: 'name',
        default: 'test',
        message: 'your project name'
    }
]).then(result=>{
    const temDir = path.join(__dirname, 'templates')
    // 获取当前目录
    const outerDir = process.cwd();
    console.log(temDir)
    fs.readdir(temDir, (err,files)=>{
        if(err) throw err;
        files.forEach(file=>{
            // 取得文件名后 这个只是简单的第一层，肯定还有多层的情况，后续
            ejs.renderFile(path.join(temDir, file), result, (err, dealFile)=>{
                if(err) throw err;
                // 将结果写入
                fs.writeFileSync(path.join(outerDir,file), dealFile)
            })
        })
    })
})