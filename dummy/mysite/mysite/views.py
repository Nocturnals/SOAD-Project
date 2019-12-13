
from django.shortcuts import render

from django.shortcuts import render
import requests

def home(request):
    response = requests.get('http://localhost:4000/api/subscriptions/fossv52eyk42iqqcy/showallplans',verify=False)
    post = response.json()
    # print('#####',post[0])
    # for i in range(len(post)):  
    #     variable.append(str(post[i]["_id"]))
    print(post)
    return render(request, 'core/index.html', {
        'name': post
    })

# this is link of show categories of bronze
def subscribe(request):
    response = requests.post('http://localhost:4000/api/subscriptions/fossv52eyk42iqqcy/showcategories/5dd05f216e208456dee20c9b',verify = False)
    subs = response.json()
    print(subs)
    return render(request,'core/subs.html',{
        'list' : subs
    })

#keep the link of show categories of Gold

def subscribe2(request):
    response = requests.post('http://localhost:4000/api/subscriptions/fossv54p9k42azlfa/showcategories/5dd0d22240682f6c389774fe',verify=False)
    subs2 = response.json()
    print(subs2)
    return render(request,'core/subs2.html',{
        'list2' : subs2
    })


def posts(request):
    response = requests.post('http://localhost:4000/api/subscriptions/fossv52eyk42iqqcy/showposts/Story Writer/5dd05f216e208456dee20c9b',verify=False)
    post3 = response.json()

    print(post3)
    return render(request,'core/index3.html',{
        'postlist' : post3
    })


def category1(request):
    response = requests.post('http://localhost:4000/api/subscriptions/fossv52eyk42iqqcy/showposts/Comedian/5dd05f216e208456dee20c9b',verify=False)
    cat1 = response.json()

    return render(request,'core/index4.html',{
        'cat1' : cat1
    })

def category2(request):
    response = requests.post('http://localhost:4000/api/subscriptions/fossv54p9k42azlfa/showposts/story writer/5dd05f216e208456dee20c9b')
    cat2 = response.json()

    return render(request,'core/index5.html',{
        'cat2' : cat2
    })
def category3(request):
    response = requests.post('http://localhost:4000/api/subscriptions/fossv54p9k42azlfa/showposts/painter/5dd05f216e208456dee20c9b')
    cat3 = response.json()

    return render(request,'core/index9.html',{
        'cat3' : cat3
    })

#Gold Comedian Link
def goldcategory1(request):
    response = requests.post('http://localhost:4000/api/subscriptions/fossv54p9k42azlfa/showposts/story writer/5dd0d22240682f6c389774fe',verify=False)
    goldcat1 = response.json()

    return render(request,'core/index6.html',{
        'goldcat1' : goldcat1
    })

# Gold painter Link
def goldcategory2(request):
    response = requests.post('http://localhost:4000/api/subscriptions/fossv54p9k42azlfa/showposts/photographer/5dd0d22240682f6c389774fe',verify=False)
    goldcat2 = response.json()
    return render(request,'core/index7.html',{
        'goldcat2' : goldcat2
    })

# Gold singer Link

def goldcategory3(request):
    response = requests.post('',verify=False)
    goldcat3 = response.json()
    return render(request,'core/index8.html',{
        'goldcat3' : goldcat3
    })