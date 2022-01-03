import cloudbase from '@cloudbase/js-sdk'

const cloud = cloudbase.init({
  env: 'mall-2gdgzk540aab98cd',
})

const clientUrl = 'http://39.103.198.52:3006/i'

/**
 * 上传图片
 * @param cloudPath
 * @param filePath
 * @returns
 */
function uploadFile(cloudPath, filePath): Promise<{ tempFileURL: string; fileID: string }> {
  return new Promise((resolve, reject) => {
    cloud
      .uploadFile({
        // 云存储的路径
        cloudPath: cloudPath,
        filePath: filePath,
      })
      .then((res) => {
        // 返回文件 ID
        return cloud
          .getTempFileURL({
            fileList: [res.fileID], //要下载的文件 ID 组成的数组 本示例填写为上面代码的文件id
          })
          .then((result: any) => {
            result.fileList.forEach((el) => {
              if (el.code === 'SUCCESS') {
                resolve({
                  tempFileURL: el.tempFileURL,
                  fileID: el.fileID,
                })
              } else {
                console.log('获取地址失败') //获取地址失败
              }
            })
          })
      })
  })
}

export { cloud, uploadFile, clientUrl }
