from django.http import JsonResponse
from dailyReport.models import tbproject

import json

def insertProject(request):
    return 'insert sucess'

def getProject(request):
    return 'get project success'

def delProject(request):
    return 'delete project success'

def updateProject(request):
    return 'update project success'

# 项目列表获取
# 项目详细数据获取