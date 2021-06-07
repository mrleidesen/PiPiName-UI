import React, { useState } from 'react'
import { getNameList, readStatus } from '@/api'
import 'antd/dist/antd.css'

import { Tabs, Input } from 'antd'

const { TabPane } = Tabs
const { Search } = Input

export default function App() {
    const [name, setName] = useState("")
    const [xing, setXing] = useState("")
    const [source, setSource] = useState(1)
    const [list, setList] = useState<string[]>([])
    const [status, setStatus] = useState<any>(null)

    const loadStatus = async () => {
        const res = await readStatus(name)
        if (res.success) {
            setStatus(res.data)
        }
    }

    const loadNames = async () => {
        const res = await getNameList(xing, source)
        if (res.success) {
            setList(res.data)
        }
    }

    const onChangeNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onChangeXingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setXing(e.target.value)
    }

    const onSearchStatus = () => {
        loadStatus()
    }

    const onSearchNames = () => {
        loadNames()
    }


    return (
        <div className="w-full h-screen flex flex-col">
            <header className="h-14 w-full box-border px-4 bg-gray-200 flex items-center shadow">
                <span className="font-semibold text-gray-700 text-xl">PiPiName-UI</span>
            </header>
            <div className="container mx-auto box-border p-2">
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="查看命格" key="1">
                    <div className="flex flex-col w-80">
                        <Search 
                            value={name}
                            placeholder="请输入您的姓名"
                            allowClear
                            enterButton="查看"
                            onChange={onChangeNameInput}
                            onSearch={onSearchStatus}
                        />
                        <div>{JSON.stringify(status)}</div>
                    </div>
                </TabPane>
                <TabPane tab="取名字" key="2">
                    <div className="flex flex-col w-80">
                        <Search 
                            value={xing}
                            placeholder="请输入您的姓氏"
                            allowClear
                            enterButton="查看"
                            onChange={onChangeXingInput}
                            onSearch={onSearchNames}
                        />
                        <div>{JSON.stringify(list)}</div>
                    </div>
                </TabPane>
            </Tabs>
            </div>
        </div>
    )
}