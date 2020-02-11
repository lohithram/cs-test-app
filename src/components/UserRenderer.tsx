import React from 'react'
import { GitHubUser } from '../types'

import './UserRenderer.scss'

type RendererProps<T> = {
    item: T
    onClick: (item: T) => void
}

const UserRenderer = (props: RendererProps<GitHubUser>) => (
    <div className="user-renderer" onClick={() => props.onClick(props.item)}>
        <img src={props.item.avatar_url} className="user-renderer__avatar" alt="user avatar" />
        <div className="user-renderer__info">
            <span className="info__title">{props.item.login}</span>
            <span className="info__secondary">
            SCORE: <span className="info__secondary-highlight">{props.item.score}</span>
            </span>
        </div>
    </div>
)

export default UserRenderer