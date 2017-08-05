const Trie = function() {
  this.root = new TrieNode();
};

const TrieNode = function() {
  this.children = new Array(26).fill(null);
  this.endOfWord = false;
};

Trie.prototype.insert = function(word) {
  //take each letter, insert that letter as key in the TrieNode, and essentially keep going till the end of the word. At each step check if the letter exists as key already in the children map.

  let currentNode = this.root;

  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    let charCode = letter.charCodeAt() - 97;
    if (currentNode.children[charCode] === null) {
      currentNode.children[charCode] = new TrieNode();
    }
    currentNode = currentNode.children[charCode];
  }

  currentNode.endOfWord = true;
  return currentNode;
};

Trie.prototype.contains = function(word) {
  let currentNode = this.root;
  let contains = false;

  for (let key of word) {
    let charCode = key.charCodeAt() - 97;
    if (!currentNode.children[charCode]) {
      return false;
    }
    currentNode = currentNode.children[charCode];
  }
  return currentNode.endOfWord;
};

Trie.prototype.delete = function(word) {};

Trie.prototype.startsWith = function(prefix) {
  let currentNode = this.root;
  for (let i = 0; i < prefix.length; i++) {
    let currentLetter = prefix[i];
    let charCode = currentLetter.charCodeAt() - 97;
    if (currentNode.children[charCode] === null) {
      return false;
    }
    currentNode = currentNode.children[charCode];
  }
  return true;
};

//Traverse the tree based on the key digits in keystring, to find nodes where relevant words are stored.
Trie.prototype.getSuggestions = function(word) {
  //iterate till end of word, and once we reach end of word, we want to do a dfs for each child in the children map.

  const result = [];
  let currentNode = this.root;

  for (let key of word) {
    let charCode = key.charCodeAt() - 97;
    if (currentNode.children[charCode]) {
      currentNode = currentNode.children[charCode];
    } else if (currentNode.children[charCode] === null) {
      return [];
    }
  }

  const dfs = (node, generatedWord) => {
    if (node.endOfWord === true) {
      result.push(generatedWord);
    }

    for (let key = 0; key < node.children.length; key++) {
      if (node.children[key] !== null) {
        let letter = String.fromCharCode(key + 97);
        let child = node.children[key];
        dfs(child, (generatedWord += letter));
      }
    }
  };

  dfs(currentNode, word);

  return result;
};
