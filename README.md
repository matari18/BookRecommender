# Project: Book Recommender System Using Machine Learning (Collaborative Filtering Based)

Collaborative methods for recommender systems are methods that are based solely on the past interactions recorded between users and items in order to produce new recommendations. These interactions are stored in the so-called “user-item interactions matrix”.

## Dataset used: 
https://www.kaggle.com/datasets/arashnic/book-recommendation-dataset

## Deployment:
### 1. With terminal navigate to the root of this repository
### 2. Build docker image
```bash
docker build -t image_name .
```
### 3. Run container
```bash
docker run --name container_name -p 8000:8000 image_name
```

### 4. Result
INFO: Uvicorn running on http://localhost:8000/static/index.html


Use this url in chrome to see the model frontend; use http://localhost:8000/docs for testing the model in the web interface.