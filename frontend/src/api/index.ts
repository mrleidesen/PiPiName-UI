import service from './request'

export const readStatus = async (name: string) => service.get('/api/status', { params: { name } })

export const getNameList = async (xing: string, source: number) => service.get('/api/names', { params: { xing, source } })