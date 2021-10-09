import React from 'react'
import QrContext from '../contexts/QrContext'
export default function Checklist() {
const {users}  = QrContext()
    return (
        <div>
            checklist
            {console.log(users)}
        </div>
    )
}
