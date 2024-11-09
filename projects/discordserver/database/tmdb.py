import pymongo
import json
import requests
import certifi

#Set up constants for connecting to TMDB API and MongoDB
tmdb_key = "((TMDB API KEY GOES HERE))"
database_user_name = "((MONGO USERNAME GOES HERE))"
database_user_password = "((MONGO PASSWORD GOES HERE))"
database_name = "Films"

#Connect to the MongoDB database
client = pymongo.MongoClient('mongodb+srv://'+database_user_name+':'+database_user_password+'@cluster.cjylvb8.mongodb.net/'+database_name+'?retryWrites=true&w=majority', tlsCAFile=certifi.where())

#Enter MongoDB collection name
collectionName = '((COLLECTION NAME))'
#Enter file name (each line formatted: <FILM TITLE> - <YEAR>)
fileName = './film_lists/((FILENAME GOES HERE))'

#Constants for generating the final object to be stored into the MongoDB database
movieGenres = []

def getMovieGenres():
    genreStr = 'https://api.themoviedb.org/3/genre/movie/list?api_key='\
                + tmdb_key + '&language=en-US'
    requestObj = requests.get(genreStr)
    json_data = json.loads(requestObj.text)
    global movieGenres
    movieGenres = json_data['genres']

def getDirector(movieID):
    creditsStr = 'https://api.themoviedb.org/3/movie/'\
                 + str(movieID) + '/credits?api_key=' + tmdb_key
    requestObj = requests.get(creditsStr)
    json_data = json.loads(requestObj.text)
    crew = json_data['crew']
    director = 'DIRECTOR NOT FOUND'
    for member in crew:
        if(member['job']=='Director' and member['department']=='Directing'):
            director = member['name']
            break

    return director

def searchMovie(movieTitle, year):
    searchStr = 'https://api.themoviedb.org/3/search/movie?api_key='\
                 + tmdb_key + '&language=en-US&query=' + movieTitle + '&page=1&include_adult=true&year=' + year
    requestObj = requests.get(searchStr)
    json_data = json.loads(requestObj.text)
    results = json_data['results']
    if(len(results)==0):
        return results
    index = -1
    for i in range(len(results)):
        if((not (0<=index<len(results))) and ((results[i]['title']).lower())==(movieTitle.lower())):
            index = i
        elif((0<=index<len(results)) and results[i]['popularity']>results[index]['popularity'] and (results[i]['title']).lower()==movieTitle.lower()):
            index = i

    page = 1
    while(index==-1):
        page+=1
        searchStr = 'https://api.themoviedb.org/3/search/movie?api_key='\
                     + tmdb_key + '&language=en-US&query=' + movieTitle + '&page=' + str(page) + '&include_adult=true&year=' + year
        results = (json.loads((requests.get(searchStr)).text))['results']
        if(len(results)==0):
            return results
        for i in range(len(results)):
            if((not (0<=index<len(results))) and ((results[i]['title']).lower())==(movieTitle.lower())):
                index = i
            elif((0<=index<len(results)) and results[i]['popularity']>results[index]['popularity'] and (results[i]['title']).lower()==movieTitle.lower()):
                index = i

    return results[index]

def main():
    getMovieGenres()

    f = open(fileName, 'r')
    fileLines = f.readlines()
    collection = (client.get_default_database())[collectionName]

    for line in fileLines:
        line = line.strip()
        movieTitle = line[0:line.index('-')-1]
        year = line[line.index('-')+2:]

        movie = searchMovie(movieTitle, year)
        if(len(movie)==0):
            print('NO RESULTS FOR ' + movieTitle)
            continue

        director = getDirector(movie['id'])

        genres = []
        for j in range(len(movie['genre_ids'])):
            for k in range(len(movieGenres)):
                if(movie['genre_ids'][j]==movieGenres[k]['id']):
                    genres.append(movieGenres[k]['name'])
                    break

        if(movie['poster_path']):
            movie['poster_path'] = 'https://image.tmdb.org/t/p/w500' + movie['poster_path']

        movie['genre_ids'] = genres
        movie['director'] = director
        collection.insert_one(movie)
        print('ADDED '+movieTitle+' TO DATABASE')

        director = ''

#Call function main() to being the program
main()
