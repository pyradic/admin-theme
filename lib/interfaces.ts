import { CreateElement, VNode, VNodeData } from 'vue';


export type IconRenderer = (h: CreateElement, icon: string, data?: VNodeData) => VNode
export type IconMapper = (name: string, target: string, icon: string) => string