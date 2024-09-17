from typing import List

import joblib
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel


model = joblib.load('./artifacts/model.joblib')
book_pivot = joblib.load('./artifacts/book_pivot.joblib')
book_names = joblib.load('artifacts/book_names.joblib')

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


def get_book_recommendations(book_title):
    book_index = book_pivot.index.get_loc(book_title)
    distances, indices = model.kneighbors(book_pivot.iloc[book_index, :].values.reshape(1, -1), n_neighbors=11)
    recommended_books = [book_pivot.index[i] for i in indices.flatten()][1:]
    return recommended_books


@app.get('/')
def read_root():
    return {'message': 'Book recommender model API'}

@app.get("/books", response_model=List[str])
def books():
    return book_names

@app.post('/recommend')
def recommend(item_name: str):
    recommendation = get_book_recommendations(item_name)
    return recommendation