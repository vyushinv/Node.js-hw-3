const { test, expect } = require('@jest/globals')
const tree = require('./fs.tree.js')

test('test fileCount',()=>{
    
    expect(tree.fileCount).toBe(9)

})

test('test dirCount',()=>{
    
    expect(tree.dirCount).toBe(5)

})

test('test offset',()=>{
    
    expect(tree.offset('hw\\folder1\\file1.txt')).toBe(2)

})