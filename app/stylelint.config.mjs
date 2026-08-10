export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true,
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global', 'slotted'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'theme', 'utility', 'variant', 'variants', 'responsive', 'screen', 'source', 'plugin', 'custom-variant', 'reference'],
      },
    ],
    'import-notation': null,
    'nesting-selector-no-missing-scoping-root': null,
    'no-descending-specificity': null,
    'no-empty-source': null,
    'declaration-empty-line-before': null,
    'length-zero-no-unit': null,
    'color-function-notation': null,
    'color-function-alias-notation': null,
    'alpha-value-notation': null,
    'color-hex-length': null,
  },
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
}
