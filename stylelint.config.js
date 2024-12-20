module.exports = {
  rules: {
    indentation: 2,
    'selector-type-no-unknown': null,
    'number-leading-zero': null,
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'inside-block']
      }
    ],
    'declaration-empty-line-before': [
      'never',
      {
        ignore: ['after-declaration']
      }
    ],
    'comment-empty-line-before': null,
    'selector-type-case': null,
    'selector-list-comma-newline-after': null,
    'no-descending-specificity': null,
    'string-quotes': 'single',
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ]
  },

  root: true,

  extends: ['stylelint-config-recommneded-vue']
};
