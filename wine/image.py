
def change_directory():
    import os
    from api.models import Drinkers,Locations,Reviews,Wines
    cwd = os.getcwd()
    i = 0
    for wine in Wines.objects.values_list('name',flat = True):
        print(wine,i)
        if os.path.exists(cwd +'/image/'+ wine):
            os.rename(cwd +'/image/'+ wine, cwd +'/image/'+ str(i))  
        if os.path.exists(cwd +'/image/'+ str(i)):
            files = os.listdir(cwd +'/image/'+ str(i))
            j = 0
            for dir in files:
                os.rename(cwd +'/image/'+ str(i) + '/' + dir, cwd +'/image/'+ str(i)+'/'+ str(j))
                j+=1 
        i+=1

def increment_directory():
    import os
    from api.models import Drinkers,Locations,Reviews,Wines
    cwd = os.getcwd()
    i = 0
    for wine in Wines.objects.values_list('name',flat = True):
        print(wine,i)
        if os.path.exists(cwd +'/image/'+ wine):
            os.rename(cwd +'/image/'+ wine, cwd +'/image/wid'+ ''+str(i+1))  
        if os.path.exists(cwd +'/image/'+ str(i)):
            os.rename(cwd +'/image/'+ str(i), cwd +'/image/wid'+ str(i+1))  
        i+=1
           
def image_process(index):
    from google_images_search import GoogleImagesSearch
    gis = GoogleImagesSearch('AIzaSyDc-u2TsyW0Md8pGBwoJfdU2EBQbgwZVLA', '007571371151916945282:esik0wh-hi8')

    from api.models import Drinkers,Locations,Reviews,Wines

    Wines.objects.count()

    import os

    cwd = os.getcwd()

    start_position = index*10+1
    end_position = (index+1)*10
    i = 0
    for wine in Wines.objects.values_list('name',flat = True):
        i+=1
        if start_position<=i<=end_position:
            print(wine,i)
            if os.path.exists(cwd +'/image/wid'+ str(i)):
                continue
            try:
                _search_params = {
                'q': wine,
                'num': 2,
                'safe': 'high',
                'imgType': 'photo',
                'searchType': 'image'}
                gis.search(_search_params,cwd +'/image/wid'+ str(i))
                if os.path.exists(cwd +'/image/wid'+ str(i)):
                    files = os.listdir(cwd +'/image/wid'+ str(i))
                    j = 0
                    for dir in files:
                        os.rename(cwd +'/image/wid'+ str(i) + '/' + dir, cwd +'/image/wid'+ str(i)+'/'+ str(j)+'.jpg')
                        j+=1 
            except:
                import sys
                print(sys.exc_info()[0])
                pass
        