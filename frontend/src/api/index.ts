import service from './request'

interface ResponseType {
  success?: boolean
  data?: any
  [key: string]: any
}

export const readStatus = async (name: string): Promise<ResponseType> => service.get('/status', { params: { name } })

export const getNameList = async (xing: string, source: number): Promise<ResponseType> => service.get('/names', { params: { xing, source } })