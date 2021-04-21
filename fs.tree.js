const fs = require('fs');
const path = require('path');
const rootDir = './folder1';
const rootDirOffset = rootDir.split('//').length;

let fileCount = 0 
let dirCount = 0

main()

function main(){
    console.log('├── ' + rootDir);
    tree(rootDir)
    console.log('files: ' + fileCount);
    console.log('directories: '   + dirCount);
}

function tree(dir) {
    ++dirCount
    const objects = fs.readdirSync(dir)
    objects.forEach((element, index, array) => array[index] = path.join(dir, element))

    const files = objects.filter(obj => fs.statSync(obj).isFile())
    files.forEach(fileHandler)

    const directories = objects.filter(obj => fs.statSync(obj).isDirectory())
    directories.forEach(dirHandler)
}

function dirHandler(element, index, array) {
    const isLastElement = ((array.length - 1) === index)
    let string = '│'.repeat(offset(element)) + '├── ' + path.basename(element)
    if (isLastElement) {string = string.replace('├── ', '└── ')}
    console.log(string)
    tree(element)
}

function fileHandler(element, index, array) {
    ++fileCount
    const isLastElement = ((array.length - 1) === index)
    let string = ' '.repeat(offset(element)) + '     ' + '├── ' + path.basename(element)
    if (isLastElement) {string = string.replace('├── ', '└── ')}
    console.log(string)
}

function offset (path) {
    if (path === undefined) {
        return 0
    }
    return path.split('\\').length - rootDirOffset;
}


module.exports.fileCount = fileCount;
module.exports.dirCount = dirCount;
module.exports.offset = offset;
