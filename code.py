#!/usr/bin/evn python
# coding: utf-8
import os
import sys

abspath = os.path.abspath(os.path.dirname(__file__))
sys.path.append(abspath)
os.chdir(abspath)

import web
import thread

default_encoding = 'utf-8'
if sys.getdefaultencoding() != default_encoding:
    reload(sys)
    sys.setdefaultencoding(default_encoding)

render = web.template.render('nomadic2.0/')
db = web.database(dbn='mysql',user='root',pw='wzhkt4MVny',db='nomadic',charset='latin1')
urls = (
    '/','index',
    '/add','add',
    '/leave','leave',
    '/dialogSave','dialogSave',
    '/liuyanSave','liuyanSave',
    '/nameSave','nameSave',
    '/passSave','passSave',
    '/photoSave','photoSave',
    '/logcl','logcl',
    '/registercl','registercl',
    '/emailcl','emailcl',
    '/zhuxiao','zhuxiao',
    '/shezhi','shezhi',
)
app = web.application(urls,globals())

class index:
    def GET(self):
        i = web.input(id="no data")
        if i.id != "no data":
            return web.id
        else:
            c = web.cookies(nomadicid="none",nomadicpass="none")
            if c.nomadicid == "none" or c.nomadicpass == "none":
                return render.login("OK","OK")
            sql = "select ip from mysession where id =" + c.nomadicid
            results = db.query(sql)
            for todo in results:
                if c.nomadicpass == todo.ip:
                    sql = "select * from myline where memid = "+c.nomadicid
                    result = db.query(sql)
                    sql = "select * from mysubline where memid = "+c.nomadicid
                    subresult = db.query(sql)
                    sql = "select * from myuser where id = "+c.nomadicid
                    user = db.query(sql)[0]
                    name = user.name
                    head_image = user.head_image
                    citynum = user.citynum
                    mile = user.mile
                    return render.index(result,subresult,name,head_image,citynum,mile)
            return render.login("OK","OK")

class add:
    def POST(self):
        i = web.input()
        c = web.cookies(nomadicid="none")
        if c.nomadicid == "none":
            return render.login("OK","OK")

        sublines = list(i.the_subline.split('@'))
        sublines.pop()

        print "OK"
        lineid = db.insert('myline',name=i.the_name.encode('utf-8','latin1'),classid=i.the_class.encode('utf-8','latin1'),beizhu=i.the_beizhu.encode('utf-8','latin1'),line=i.the_line.encode('utf-8','latin1'),memid=c.nomadicid,timeinfo=i.the_time.encode('utf-8','latin1'),lineinfo=i.the_title.encode('utf-8','latin1'))

        print "OK"
        for subline in sublines:
            db.insert('mysubline',memid=c.nomadicid,classid=i.the_class.encode('utf-8','latin1'),lineid=lineid,line=subline)
        raise web.seeother('/')

class leave:
    def POST(self):
        i = web.input()
        ids = i.the_id.encode('utf-8','latin1').split(',')
        clases = list(i.the_class.encode('utf-8','latin1')[::2])
        for j in range(len(clases)):
            sql = "id = "+ids[j]
            db.update('myline', where= sql, classid = clases[j])
            sql = "lineid = "+ids[j]
            db.update('mysubline', where= sql, classid = clases[j])
        db.delete('myline', where= "classid=2")
        db.delete('mysubline', where= "classid=2")

class dialogSave:
    def POST(self):
        i = web.input()
        sql = "id = "+i.the_id.encode('utf-8','latin1')
        db.update('myline', where= sql, beizhu = i.the_beizhu.encode('utf-8','latin1'), timeinfo = i.the_time.encode('utf-8','latin1'))

class liuyanSave:
    def POST(self):
        i = web.input()
        c = web.cookies(nomadicid="none")
        if c.nomadicid == "none":
            return render.login("OK","OK")
        db.insert('myliuyan',fromid=c.nomadicid,toid=1,container=i.the_liuyan.encode('utf-8','latin1'))

class nameSave:
    def POST(self):
        i = web.input()
        c = web.cookies(nomadicid="none")
        if c.nomadicid == "none":
            return render.login("OK","OK")

        sql = "select * from myuser where name = \""+i.username.encode('utf-8','latin1')+"\""
        results = db.query(sql)
        if results:
            return render.set("用户名已存在")

        sql = "id = "+c.nomadicid
        db.update('myuser', where= sql, name = i.username.encode('utf-8','latin1'))
        return render.set("昵称修改成功")

class passSave:
    def POST(self):
        i = web.input()
        c = web.cookies(nomadicid="none")
        if c.nomadicid == "none":
            return render.login("OK","OK")

        sql = "select * from myuser where id = " + c.nomadicid
        results = db.query(sql)
        passwd = results[0].password
        if passwd != i.passwd1:
            return render.set("旧的密码输入错误")

        sql = "id = "+c.nomadicid
        db.update('myuser', where= sql, password = i.passwd2.encode('utf-8','latin1'))
        return render.set("密码修改成功")

class photoSave:
    def POST(self):
        c = web.cookies(nomadicid="none")
        if c.nomadicid == "none":
            return render.login("OK","OK")

        i = web.input(the_image={})
        filedir = '/var/www/a_test/static/image/Head_Image'
        if 'the_image' in i:
            filename=""+c.nomadicid+"."+i.the_name
            fout = open(filedir +'/'+ filename,'w')
            fout.write(i.the_image.file.read())
            fout.close()  
            sql = "id = "+c.nomadicid
            db.update('myuser', where= sql, head_image = filename.encode('utf-8','latin1'))
        return render.set("头像上传成功")

class logcl:
    def POST(self):
        i = web.input()
        sql = "select * from myuser where name = \""+i.username.encode('utf-8','latin1')+"\""
        results = db.query(sql)
        if results:
            result = results[0]
            id = result.id
        if results and result.password == i.passwd.encode('utf-8','latin1'):
            t_lapse = 18000
            if i.check == 1:
                t_lapse = 1209600
            web.setcookie('nomadicid',id, t_lapse)
            ip = web.ctx.ip
            sql = "replace into mysession (ip,id) values (" + "\"" + ip +"\"," + str(id) +")"
            db.query(sql)
            web.setcookie('nomadicpass', ip, t_lapse)
            raise web.seeother('/')
        if results:
            err = "log_pass"
            other = i.username
        else:
            err = "log_name"  
            other = "OK"  
        return render.login(err,other)

class registercl:
    def POST(self):
        i = web.input()

        sql = "select * from myuser where name = \""+i.username.encode('utf-8','latin1')+"\""
        results = db.query(sql)
        if results:
            err = "reg_name"
            other = "OK"
            return render.login(err,other)

        sql = "select * from myuser where email = \""+i.email.encode('utf-8','latin1')+"\""
        results = db.query(sql)
        if results:
            err = "reg_email"
            other = "OK"
            return render.login(err,other)

        id = db.insert('myuser',name=i.username.encode('utf-8','latin1'),password=i.passwd.encode('utf-8','latin1'),email=i.email.encode('utf-8','latin1') )

        web.setcookie('nomadicid',id, 18000)
        ip = web.ctx.ip
        sql = "replace into mysession (ip,id) values (" + "\"" + ip +"\"," + str(id) +")"
        db.query(sql)
        web.setcookie('nomadicpass', ip, 18000)

        return render.welcome()

def thread_send_mail(email,passwd):
    web.config.smtp_server = 'smtp.gmail.com'
    web.config.smtp_port = 587
    web.config.smtp_username = 'tsbackpacker@gmail.com'
    web.config.smtp_password = 'qq53376122'
    web.config.smtp_starttls = True
    web.sendmail('tsbackpacker@gmail.com', email, 'nomadic修改密码', passwd)

class emailcl:
    def POST(self):
        i = web.input()
        sql = "select * from myuser where email = \""+i.email.encode('utf-8','latin1')+"\""
        results = db.query(sql)
        if results:
            passwd = "您的密码：" + results[0].password + "，请用此密码登录并尽快更改密码"
            thread.start_new_thread(thread_send_mail, (i.email,passwd))
            err = "email"
            other = "您的密码已经发送至您的邮箱，请尽快查收密码，登录并修改密码"
        else:
            err = "email_wrong"
            other = "您的邮箱尚未注册，请先注册，谢谢"
        return render.login(err,other)

class zhuxiao:
    def POST(self):
        i = web.input()
        web.setcookie('nomadicid',"OK", -1)
        return render.login("OK","OK")

class shezhi:
    def POST(self):
        i = web.input()
        return render.set("OK")

application = app.wsgifunc()
if __name__ == "__main__":
    app.run()
