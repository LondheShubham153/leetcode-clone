from django.urls import path
from problems import views
urlpatterns = [
    # path('',views.add_data),
    path('problems',views.problems),
    path('problems/',views.problems),
    path('personal',views.personal, name='personal'),
    path('viewproblem/<int:id>', views.viewproblem, name='viewproblem'),
    path('problems/sort/<str:sort>',views.sorting),
    path('problems/<str:search>',views.searchproblem),
    path('profileupdate', views.profileupdate, name='profileupdate'),
    path('login',views.login),
    path('',views.login),
    path('signup',views.signup),
    path('logout',views.logout, name='logout'),
    path('problemform', views.problemform, name='problemform'),
    path('addproblem',views.addProblem),
    path('deleteproblem/<int:id>',views.deleteproblem, name='deleteproblem'),
    path('newcompany/<str:newcompany>/',views.setnewcompany, name='newcompany')
]