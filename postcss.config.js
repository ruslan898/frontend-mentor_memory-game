import pxtorem from 'postcss-pxtorem';

export default {
  plugins: [
    pxtorem({
      rootValue: 16,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: true,
      minPixelValue: 0,
    })
  ],
};
