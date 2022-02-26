from django.urls import path
from users import views
urlpatterns = [
path('login',views.login, name='login'),
path('signup',views.signup, name='signup'),
path('logout',views.logout, name='logout'),
path('getoneproblem/<int:id>',views.getoneproblem, name='getoneproblem'),
path('problemset',views.problemset, name='problemset')
]