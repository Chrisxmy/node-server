module.exports = {
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

