module.exports = {
    host: '127.0.0.1',
    port:'8486',
    root: process.cwd(),
    compress: /\.(html|css|js|md)$/,
    cache: {
      maxAge:600,
      expires:true,
      cacheControl:true,
      lastModified:true,
      etag:true
    }
}

