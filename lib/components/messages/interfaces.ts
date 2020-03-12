export type IMessageType = 'info'|'warning'|'error'|'success'|'important'

export type IMessages<T extends IMessageType=null>  = {
    [K in keyof T]?: string[]
}