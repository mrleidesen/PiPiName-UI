import React, { useState } from 'react'
import { getNameList, readStatus } from '@/api'
import 'antd/dist/antd.css'

import { Tabs, Input, Spin, Select, Button } from 'antd'

const { TabPane } = Tabs
const { Search } = Input
const { Option } = Select

export default function App() {
    const [name, setName] = useState("")
    const [xing, setXing] = useState("")
    const [source, setSource] = useState(1)
    const [list, setList] = useState<string[]>([])
    const [status, setStatus] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const selectOptions = ["默认", "诗经", "楚辞", "论语", "周易", "唐诗", "宋诗", "宋词"]

    const loadStatus = async () => {
        setLoading(true)
        try {
            const res = await readStatus(name)
            if (res.success) {
                setStatus(res.data)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const loadNames = async () => {
        setLoading(true)
        try {
            const res = await getNameList(xing, source)
            if (res.success) {
                setList(res.data)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const onChangeNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onChangeXingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setXing(e.target.value)
    }

    const onChangeSelect = (e: any) => {
        setSource(parseInt(e))
    }

    const onSearchStatus = () => {
        const size = name.trim().length
        if (size > 1 && size < 5) {
            loadStatus()
        } else {
            alert("请输入长度2-4的姓名")
        }
    }

    const onSearchNames = () => {
        const size = xing.trim().length
        if (size > 0 && size < 3) {
            loadNames()
        } else {
            alert("请输入长度1-2的姓氏")
        }
    }

    const SelectComp = () => (
        <Select 
            defaultValue={source} 
            className="select-after"
            onChange={onChangeSelect}
        >
            {selectOptions.map((select, v) => (
                <Option key={v} value={v}>{select}</Option>
            ))}
        </Select>
    )

    return (
        <div className="w-full h-screen flex flex-col">
            <header className="h-14 w-full box-border px-4 bg-gray-200 flex items-center shadow">
                <span className="font-semibold text-gray-700 text-xl">PiPiName-UI</span>
            </header>
            <div className="flex-1 overflow-auto container mx-auto box-border p-2">
                <Tabs defaultActiveKey="1" type="card">
                    <TabPane tab="查看命格" key="1">
                        <div className="flex flex-col">
                            <div className="w-80 mb-2 flex">
                                <Search 
                                    value={name}
                                    placeholder="请输入您的姓名"
                                    allowClear
                                    enterButton="查看"
                                    loading={loading}
                                    onChange={onChangeNameInput}
                                    onSearch={onSearchStatus}
                                />
                            </div>
                            
                            {status ? (
                                <div className="flex flex-col" style={{ minHeight: 200 }}>
                                    <Spin spinning={loading}>
                                        <p>姓名：<b>{status.name}</b></p>
                                        <p>天格：<b>{status.tian}</b></p>
                                        <p>人格：<b>{status.ren}</b></p>
                                        <p>地格：<b>{status.di}</b></p>
                                        <p>总格：<b>{status.zong}</b></p>
                                        <p>外格：<b>{status.wai}</b></p>
                                        <p>三才：<b>{status.sancai}</b></p>
                                        <p>三才类型：<b>{status.sancai_type}</b></p>
                                    </Spin>
                                </div>
                            ) : null}
                        </div>
                    </TabPane>
                    <TabPane tab="取名字" key="2">
                        <div className="flex flex-col">
                        <div className="w-80 mb-2 flex">
                                <Input 
                                    value={xing}
                                    placeholder="请输入您的姓氏"
                                    allowClear
                                    onChange={onChangeXingInput}
                                />
                                <SelectComp />
                                <Button 
                                    type="primary"
                                    loading={loading} 
                                    onClick={onSearchNames}
                                >查看</Button>
                            </div>
                                
                            <div className="flex flex-col" style={{ minHeight: 200 }}>
                                <Spin spinning={loading}>
                                    {list.map((item, i) => (
                                        <p key={i}>{item}</p>
                                    ))}
                                </Spin>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}