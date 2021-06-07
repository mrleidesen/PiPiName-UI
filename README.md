# PiPiName-UI
Python取名代码改自[PiPiName](https://github.com/NanBox/PiPiName)

改造成FastAPI

根据三才五格，从诗经、楚辞、论语、周易、唐诗、宋词给宝宝取名。

相关阅读可以[看这里](https://juejin.cn/post/6868186071260856334)。

# 使用方法

## 0. 虚拟环境
在目录下创建虚拟环境
```
python -m venv venv
```
进入环境(Windows下)
```
venv\Scripts\activate
```

## 1. 安装依赖
```
pip install -r requirements.txt
```

## 2. 启动后端
```
uvicorn app:app --reload
```

## 3. 前端依赖
请提前安装好`Node.js`
```python
cd frontend
npm install # or yarn
```

## 4. 启动前端项目
```python
npm run dev # or yarn dev
```

# 感谢

- [OpenCC](https://github.com/BYVoid/OpenCC)
- [chinese-poetry](https://github.com/chinese-poetry/chinese-poetry)
- [chineseStroke](https://github.com/WTree/chineseStroke)
- [Chinese-Names-Corpus]()
- [hanzi_chaizi](https://github.com/howl-anderson/hanzi_chaizi)
