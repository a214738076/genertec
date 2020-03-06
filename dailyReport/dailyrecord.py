from django.http import JsonResponse
from dailyReport.models import tbdailyrecord

import json

# 日常数据录入
def insertDailyrecord(request):
    tbdailyRecord = tbdailyrecord(
        department = request.POST.get('department', False),
        date = request.POST.get('date', False),
        attender = request.POST.get('attender', False),
        description = request.POST.get('description', False),
        partner = request.POST.get('partner', False),
        tag = request.POST.get('tag', False),
        project = request.POST.get('projectname', False),
        customer = request.POST.get('customer', False),
        productdesign = request.POST.get('productdesign', False),
        teamwork = request.POST.get('teamwork', False),
        orgnization = request.POST.get('orgnization', False),
        management = request.POST.get('management', False),
        operation = request.POST.get('operation', False),
        competence = request.POST.get('competence', False),
    )

    tbdailyRecord.save()
    return 'insert dailyrecord sucess'

# 日常数据获取
def getDailyrecord(request):
    id = request.GET.get('id')
    if id is not None and id != '0':
        ret = getDailyrecordById(id)
        return ret

    date = request.GET.get('date')
    department = request.GET.get('department')

    res = tbdailyrecord.objects.filter(date = date)
    ret = list(res.values())


    return ret

def getDailyrecordById(Id):
    res = tbdailyrecord.objects.filter(id = Id)
    ret = list(res.values())

    return ret

def delDailyrecord(request):
    return 'delete dailyrecord success'

def updateDailyrecord(request):
    id = request.POST.get('id')
    id = int(id)

    #res = tbdailyrecord.objects.get(id=id).update(department='test')

    res = tbdailyrecord.objects.filter(id = id)
    department = request.POST.get('department', False),
    date = request.POST.get('date', False), 
    attender = request.POST.get('attender', False),
    description = request.POST.get('description', False),
    partner = request.POST.get('partner', False),
    tag = request.POST.get('tag', False), 
    customer = request.POST.get('customer', False),
    productdesign = request.POST.get('productdesign', False),
    teamwork = request.POST.get('teamwork', False),
    orgnization = request.POST.get('orgnization', False),
    management = request.POST.get('management', False),
    operation = request.POST.get('operation', False),
    competence = request.POST.get('competence', False),
    project = request.POST.get('projectname', False)
 
    res = tbdailyrecord.objects.filter(id=id).update(department=department[0], date=date[0], attender=attender[0], description=description[0], partner=partner[0], tag=tag[0], project=project, customer=customer[0], productdesign=productdesign[0], teamwork=teamwork[0], orgnization=orgnization[0], management=management[0], operation=operation[0], competence=competence[0])
    #res.save()
    
    return 'update dailyrecord success'

def getDailyrecordByDate(date):
    dailyrecord = tbdailyrecord.objects.filter(date=date)
    return dailyrecord



