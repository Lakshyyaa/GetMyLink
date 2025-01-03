class TrieNode {
    isEnd: boolean
    urls: string[]
    arr: TrieNode[]
    constructor() {
        this.arr = new Array(26)
        this.isEnd = false
        this.urls = []
    }
    existsNode(c: string) {
        return this.arr[c.charCodeAt(0) - 'a'.charCodeAt(0)] !== undefined
    }
    createNode(c: string) {
        this.arr[c.charCodeAt(0) - 'a'.charCodeAt(0)] = new TrieNode()
    }
    getNode(c: string) {
        return this.arr[c.charCodeAt(0) - 'a'.charCodeAt(0)]
    }
    setEnd(url: string) {
        this.isEnd = true
        this.urls.push(url)
    }
    serializeNode(): string {
        return JSON.stringify({
            isEnd: this.isEnd,
            urls: this.urls,
            arr: this.arr.map((node) => node!==undefined ? node.serializeNode() : node)
        })
    }
    deserializeNode(data: string): TrieNode {
        let obj = JSON.parse(data)
        let node = new TrieNode()
        node.isEnd = obj.isEnd
        node.urls = obj.urls
        node.arr=obj.arr.map((node):string=>node!==undefined?node.deserializeNode(node):node)
    }
}
class Trie {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }
    addWord(word: string, url: string) {
        let node = this.root
        for (let c of word) {
            if (!node.existsNode(c)) {
                node.createNode(c)
            }
            node = node.getNode(c)
        }
        node.setEnd(url)
    }
    dfs(node: TrieNode, words: string[][]) {
        if (node.isEnd) {
            words.push(node.urls)
        }
        for (let i = 0; i < 26; i++) {
            if (node.arr[i] !== undefined) {
                this.dfs(node.arr[i], words)
            }
        }
    }
    serialize() {
        return this.root.serializeNode()
    }
    deserialize(data: string): Trie {
        let newt = new Trie()
        let obj= JSON.parse(data)
        let newTrieNode= new TrieNode()
        newTrieNode.isEnd= obj.isEnd
        newTrieNode.urls= obj.urls
        newTrieNode.arr= obj.arr.map((node:string) => node!==undefined ? newTrieNode.deserializeNode(node) : node)
        return newt
    }
    getWords(word: string) {
        let words: string[][] = []
        let node = this.root
        let isPrefix: boolean = true
        for (let c of word) {
            if (!node.existsNode(c)) {
                isPrefix = false
                break
            }
            node = node.getNode(c)
        }
        if (!isPrefix) {
            return words
        }
        this.dfs(node, words)
        return words
    }
}
export { Trie }