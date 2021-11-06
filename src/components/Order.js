import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function Order() {
    return (
        <>
            <Link className = "indentOrder" to="/indentorder">
            <Button >
                Indent Order
            </Button>
            </Link>
        </>
    )
}
