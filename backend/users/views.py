from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
import usersqlite




#####   Login Existing User
@api_view(['GET','POST'])
def login(request):
    try:
        request.session['userid']
        
    except KeyError:
        loginuser = request.data
        if loginuser:
            validdata = usersqlite.loginuservalid(loginuser['username'])
        else:
            print(loginuser)
            return JsonResponse(data = {'username':True, 'password':True, 'href':'/user/problemset'})
        if validdata:
            if validdata['password'] == loginuser['password']:
                request.session['userid'] = validdata['id']
                request.session['firstname'] = validdata['firstname']
                request.session['lastname'] = validdata['lastname']
                request.session['email'] = validdata['email']
                request.session['mobile'] = validdata['mobile']
                return HttpResponseRedirect('/user/problemset')
            return JsonResponse(data = {'username':True, 'password':False})
        else:
            return JsonResponse(data = {'username':False, 'password':True})
        
    else:
        return JsonResponse(data = {'username':True, 'password':True, 'islogin':True})


def logout(request):
    del request.session['userid']
    del request.session['firstname']
    del request.session['lastname']
    del request.session['email']
    del request.session['mobile']
    return JsonResponse({'islogin':False})


#####  Create new User
@api_view(['GET','POST'])
def signup(request):
    print(">>>>>>>",request.data)
    try:
        request.session['userid']
    except KeyError:
        if request.data:
            print(">>>>>>>>>",request.data)
            validdata = usersqlite.uservalid(request.data['username'])
            if validdata:
                return JsonResponse(data = {'userexist':True,'username':request.data['username'], 'firstname':request.data['firstname'], 'lastname':request.data['lastname'], 'mobile':request.data['mobile'],'email':request.data['email']})
            new = usersqlite.adduser((request.data['username'], request.data['password'],request.data['firstname'], request.data['lastname'],request.data['mobile'], request.data['email'],))
            if new:
                return JsonResponse(data={"isregister":True})
            return redirect('/user/signup')
        # return redirect('/user/signup')
    return JsonResponse(data={})

######  get all problems
def problemset(request):
    try:
        request.session['userid']
    except KeyError:
        return JsonResponse(data={"islogin":False})
    else:
        data =  usersqlite.getproblems()
        response = []
        index = 1
        for d in data:
            # print(">>>>",d)
            status = usersqlite.getstatus(p=d[0],u=request.session['userid'])
            response.append({'index':index,"status":"todo" if not status else status,"id":d[0], 'title':d[1], 'desc':d[2],'solution':d[3], 'difficulty':d[4],'company':d[6]})
            index += 1
    return JsonResponse(data={"data":response,"islogin":True,"firstname":request.session['firstname'],"lastname":request.session['lastname'],"email":request.session['email'],"mobile":request.session['mobile']})


######  Get Single Problem
def getoneproblem(request, id):
    data = usersqlite.getoneproblem(id)
    return JsonResponse(data={"islogin":True,"data":data})