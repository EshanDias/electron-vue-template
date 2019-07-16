if (process.env.NODE_ENV === 'development') {
  window.__devtron = { require: require, process: process }
  console.log('da tum dus')
}