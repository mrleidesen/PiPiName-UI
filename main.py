from name_set import check_resource, get_source
from wuge import check_wuge_config, get_stroke_list


def get_name():
    name_source = int(input("请选择词库，0: 默认, 1: 诗经, 2: 楚辞, 3: 论语, 4: 周易, 5: 唐诗, 6: 宋诗, 7: 宋词。请选择："))
    last_name = input("请输入姓氏，目前仅支持单姓：")
    get_name_api(name_source=name_source, last_name=last_name)

def get_name_api(name_source: int, last_name: str, gender=""):
     # 不想要的字，结果中不会出现这些字
    dislike_words = list("")
    def contain_bad_word(first_name):
        for word in first_name:
            if word in dislike_words:
                return True
        return False

    # 最小笔画数
    min_stroke_count = 3

    # 最大笔画数
    max_stroke_count = 30
    # 允许使用中吉，开启后将生成包含中吉配置的名字，生成的名字会更多
    allow_general = False

    # 是否筛选名字，仅输出名字库中存在的名字，可以过滤明显不合适的名字
    name_validate = True

    # 起名
    names = list()
    for i in get_source(name_source, name_validate, get_stroke_list(last_name, allow_general)):
        if i.stroke_number1 < min_stroke_count or i.stroke_number1 > max_stroke_count or \
                i.stroke_number2 < min_stroke_count or i.stroke_number2 > max_stroke_count:
            # 笔画数过滤
            continue
        if name_validate and gender != "" and i.gender != gender and i.gender != "双" and i.gender != "未知":
            # 性别过滤
            continue
        if contain_bad_word(i.first_name):
            # 不喜欢字过滤
            continue
        names.append(i)
    print(">>输出结果...")
    names.sort()
    
    name_list = []
    for i in names:
        name_list.append(last_name + str(i))
    
    return name_list
    # print(">>输出完毕，请查看「names.txt」文件")

def check_name_status():
    # 填入姓名，查看三才五格配置
    check_name = input("请输入姓名：")
    if len(check_name) < 2 or len(check_name) > 4:
        print(">>请输入2-4长度的姓名")
        check_name_status()
        return
    check_name_api(check_name=check_name)
    

def check_name_api(check_name: str, check_name_resource: int=0):
    # 查看姓名配置
    return check_wuge_config(check_name)
    # if check_name_resource == 1:
    #     check_resource(check_name)
    # print(">>输出完毕")

def run_app():
    check_type = int(input("请选择模式：0.取名, 1.查看三才五格 > "))
    if check_type == 0:
        get_name()
    elif check_type == 1:
        check_name_status()
    else:
        print(">>模式选择错误")
        

# run_app()