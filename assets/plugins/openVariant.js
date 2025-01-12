const plugin = require('tailwindcss/plugin');

// 調用plugin設定一個openVariant函式，plugin內建很多helper function，利用解構就可以用了
const openVariant = plugin(({ addVariant }) => {
    // addVariant中先放要創建的變體，再放變體的CSS定義，都要用字串傳遞
    addVariant('group-open', ':merge(.group).open &');
    addVariant('peer-open', ':merge(.peer).open ~ &');
});

// 把openVariant輸出
module.exports = openVariant;
