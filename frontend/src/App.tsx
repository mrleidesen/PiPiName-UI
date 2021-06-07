import React, { useEffect } from 'react'
import { readStatus } from '@/api'

export default function App() {
    useEffect(() => {
        loadStatus()
    }, [])

    const loadStatus = async () => {
        const res = await readStatus("应明哲")
        console.log(res);
    }

    return (
        <div className="bg-white">Hello App</div>
    )
}