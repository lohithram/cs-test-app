import React, { useState, ChangeEvent } from "react"
import map from "lodash/map"
import isEmpty from "lodash/isEmpty"
import get from "lodash/get"

import logo from "./logo.svg"
import "./DropDown.scss"
import { placeholder } from "@babel/types";

type DropDownProps = {
    list?: Array<any>
    loading: boolean
    placeholder?: string
    onSelect?: (item: Item) => void
    onChange?: (value: string) => void
    itemRenderer?: React.FC<DefaultRendererProps | any>
}

type Item = {
    name?: string
    label?: string
    description?: string
}

type DefaultRendererProps = {
    item: Item
    onClick?: (item: Item) => void
}

const DefaultRenderer = (props: DefaultRendererProps) => {
    const { item, onClick } = props
    return (
        <span onClick={() => onClick && onClick(item)}>
            {item.name || item.label || item.description || item}
        </span>
    )
}

const DropDown = (props: DropDownProps) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setValue(event.target.value)
        props.onChange && props.onChange(event.target.value)
    }

    const handleOnSelect = (item: Item) => {
        setOpen(false)
        setValue(get(item, ["login"]))
        props.onSelect && props.onSelect(item)
    }

    return (
        <div className='drop-down'>
            <input
                className='text-input'
                type='text'
                value={value}
                placeholder={props.placeholder}
                onChange={handleOnChange}
                onFocus={() => setOpen(true)}
            />
            {props.loading && (
                <img src={logo} className='loader' alt='spinner' />
            )}
            {!isEmpty(props.list) && open && (
                <div className='drop-down__list'>
                    
                    <div className='drop-down__list-container'>
                        {map(props.list, (item, index) => (
                            <div className='list__item' key={index}>
                                {props.itemRenderer ? (
                                    <props.itemRenderer
                                        item={item}
                                        onClick={handleOnSelect}
                                    />
                                ) : (
                                    <DefaultRenderer
                                        item={item}
                                        onClick={handleOnSelect}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DropDown
