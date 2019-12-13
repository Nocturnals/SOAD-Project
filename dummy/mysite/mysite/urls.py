"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.home,name="home"),
    path('Bronze/index2/',views.subscribe,name='subscribe'),
    path('Gold/index2/',views.subscribe2,name='subscribe2'),
    path('index3/',views.posts,name = 'posts'),
    path('bronze/index2/index3/Comedian',views.category1,name='category1'),
    path('bronze/index2/index3/StoryWriter',views.category2,name='category2'),
    path('bronze/index2/index3/Painter',views.category3,name='category3'),
    #path('index3/StoryWriter',views.category2,name='category2')
    path('Gold/index2/index3/storywriter',views.goldcategory1,name='goldcategory1'),
    path('Gold/index2/index3/photographer',views.goldcategory2,name='goldcategory2'),
    path('Gold/index2/index3/singer',views.goldcategory3,name='goldcategory3')
]

