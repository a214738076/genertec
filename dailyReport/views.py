from django.http import JsonResponse
from django.shortcuts import render

from dailyReport.project import *
from dailyReport.dailyrecord import *

from dailyReport.getVpn import *

import json
def htmlTest(request):
    return render(request, 'testVideo.html')

def htmlBigScreen(request):
    return render(request, 'daping.html')

def interfaceBigScreen(request):
    ret = {'msg': 'sucess', 'data': []}
    type = request.GET.get('type')
    if type == 'getAllUrl':
        ret['data'] = getAllUrl()
    elif type == 'getDetail':
        url = request.POST.get('url')
        index = request.POST.get('index')
        ret['data'] = getVpnDetail(url, index)

    return JsonResponse(ret, safe=False)

# Create your views here.
def index(request):
    module = request.POST.get('module')
    if module == 'project':
        data = exeProject(request)
    else:
        data = exeDailyReport(request)

    result = {"code": 0, "data": data}
    return JsonResponse(result)

"""执行日报相关操作"""
def exeDailyReport(request):
    action = request.GET.get('action')
    id = request.GET.get('id')
    if not id:
        id = request.POST.get('id')

    msg = 'success'
    data = ''
    if action == 'get':
        data = getDailyrecord(request)
    elif action == 'insert':
        if id == '0' or id == 0:
            data = insertDailyrecord(request)
        else :
            data = updateDailyrecord(request)
    elif action == 'delete':
        data = delDailyrecord(request)
    elif action == 'update':
        data = updateDailyrecord(request)
    return data

"""执行项目相关操作"""
def exeProject(request):
    action = request.GET.get('action')
    if action == 'get':
        data = getProject(request)
    elif action == 'insert':
        data = insertProject(request)
    elif action == 'delete':
        data = delProject(request)
    elif action == 'update':
        data = updateProject(request)
    return data

# def getProject(request):
#     return 'project data'
#
# def getDailyRecord(request):
#     return 'get DailyRecord data'
#
# def insertDailyRecord(request):
#     return 'insert DailyRecord data'
#
# def updateDailyRecord(request):
#     return 'update DailyRecord data'
#
# def deleteDailyRecord(request):
#     return 'delete DailyRecord data'
