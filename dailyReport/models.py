from django.db import models

# Create your models here.
class tbdailyrecord(models.Model):
    #自增主键
    id = models.AutoField(primary_key=True)
    #所在部门
    department = models.CharField(max_length=128)
    #最大长度为8的vchar字段, 2020-01-01
    date = models.CharField(max_length=12)
    #最大长度为256的varchar字段
    attender = models.CharField(max_length=256)
    description = models.CharField(max_length=512)
    partner = models.CharField(max_length=256)
    #tag = 0 表示项目事物，tag = 1表示日常事务
    tag = models.CharField(max_length=12)
    #项目名称or项目ID
    project = models.CharField(max_length=6, default="")
    #真诚客户沟通，默认值为0，只有tag=0时，该字段才有意义，以下同
    customer = models.IntegerField(default=0)
    #精彩产品设计，默认值为0
    productdesign = models.IntegerField(default=0)
    #有机架构协同，默认值为0
    teamwork = models.IntegerField(default=0)
    #高效团队组织
    orgnization = models.IntegerField(default=0)
    #规范项目管控
    management = models.IntegerField(default=0)
    #持续价值运营
    operation = models.IntegerField(default=0)
    #核心能力锻造
    competence = models.IntegerField(default=0)
    #备用字段
    extra = models.CharField(max_length=512)
    #更新时间
    updatetime = models.DateField(auto_now = True)


class tbproject(models.Model):
    #自增主键
    id = models.AutoField(primary_key=True)
    #所在部门
    department = models.CharField(max_length=128)
    #
    projectname = models.CharField(max_length=256)
    #最大长度为256的varchar字段
    attender = models.CharField(max_length=256)
    #真诚客户沟通，默认值为0，满分为5
    customer = models.IntegerField(default=0)
    #精彩产品设计，默认值为0
    productdesign = models.IntegerField(default=0)
    #有机架构协同，默认值为0
    teamwork = models.IntegerField(default=0)
    #高效团队组织
    orgnization = models.IntegerField(default=0)
    #规范项目管控
    management = models.IntegerField(default=0)
    #持续价值运营
    operation = models.IntegerField(default=0)
    #核心能力锻造
    competence = models.IntegerField(default=0)

    #更新时间
    updatetime = models.DateField(auto_now = True)
