import { cloud } from '@/modules/request'
const db = cloud.database()
/**
 * 链接数据库
 * @param tableName 表名称
 * @returns
 */
export function useCloud(tableName: string) {
  return db.collection(tableName)
}
