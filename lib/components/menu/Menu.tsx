import { component, prop, Styles } from '@pyro/platform';
import Vue from 'vue';
import { IMenu, IMenuItem } from '@pyro/menus/lib/interfaces';
import 'vue-tsx-support/enable-check'
import * as tsx from 'vue-tsx-support'
@component()
export default class Menu extends tsx.Component<{}> {
    @prop.classPrefix('menu') classPrefix: string
    @prop.object() menu: IMenu
    @prop.boolean() horizontal: boolean;

    get classes() {
        return {
            [ this.classPrefix ]: true
        }
    }

    get style(): Styles {
        return {}
    }

    get mode() {return this.horizontal ? 'horizontal' : 'vertical'; }


    render(h) {

        const renderItems = (items: IMenuItem[]) => items.map(item => {
            if ( item.children.length > 0 ) {
                return (
                    <el-submenu
                        tag="div"
                        class={item.class}
                        index={item.id.toString()}
                        href={item.url}
                    >
                        {/*<template slot="title">{item.title}</template>*/}
                        <template slot="title">
                            {item.icon ? <i className={item.icon} /> : null}
                            <span>{item.title}</span>
                        </template>
                        {renderItems(item.children)}
                    </el-submenu>
                )
            }
            return (
                <el-menu-item
                    tag="a"
                    class={item.class}
                    index={item.id.toString()}
                    href={item.url}
                >
                    {item.icon ? <i class={item.icon} /> : null}
                    <span>{item.title}</span>
                </el-menu-item>
            )
        })

        return (
            <el-menu mode="horizontal" tag="div">
                {renderItems(this.menu.children)}
            </el-menu>
        )
    }

}
