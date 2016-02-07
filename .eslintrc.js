module.exports = {
    "extends": "airbnb",
    "rules": {
        "func-names": 0,
        "indent": [2, 4],
        "comma-dangle": [2, "never"],
        "no-multi-spaces": [2, { exceptions: { "VariableDeclarator": true } }],
        "prefer-template": 0,
        "max-len": [2, 150, 2, {
          'ignoreUrls': true,
          'ignoreComments': false
        }],
    }
};
