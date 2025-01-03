import { Trie } from './trie'
let trie = new Trie()
trie.addWord("google", "www.google.com")
trie.addWord("google", "www.google1.com")
trie.addWord("google", "www.google2.com")
trie.addWord("1oogle", "www.google3.com")
let x= trie.serialize()
console.log(x)