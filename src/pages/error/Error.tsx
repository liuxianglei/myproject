/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import errImg from '../../assets/images/error-page/error-404.svg'
import './error.less'

export default class Error extends Component<RouteComponentProps> {
    render() {
        return (
            <div className="error">
                <img className="img" src={errImg} alt="404" />
                <div className="text">
                    <h2>404</h2>
                    <h2>抱歉，你访问的页面不存在</h2>
                </div>
            </div>
        )
    }
}
