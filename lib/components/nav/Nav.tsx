import { component, prop, Styles } from '@pyro/platform';
import Vue from 'vue';
import { IMenu, IMenuItem } from '@pyro/menus-module/lib/interfaces';
import 'vue-tsx-support/enable-check'
import * as tsx from 'vue-tsx-support'
@component()
export default class Nav extends tsx.Component<{}> {
    @prop.classPrefix('nav') classPrefix: string
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
            let index=item.id.toString()
            if ( item.children.length > 0 ) {
                return (
                    <el-submenu
                        tag="div"
                        class={item.class}
                        index={index}
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
                    index={index}
                    href={item.url}
                >
                    {item.icon ? <i className={item.icon} /> : null}
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
