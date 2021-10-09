import React from 'react'
import QrContext from '../contexts/QrContext'
export default function Visitor() {
    const {users}  = QrContext()
    return (
        <div>
            visitor
        </div>
    )
}
