// webpack の file-loader を通した import は、配信されるファイルの URL になります。
declare module '!!file-loader?*' {
  const url: string
  export default url
}
