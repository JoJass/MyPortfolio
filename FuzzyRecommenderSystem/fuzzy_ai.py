# -*- coding: utf-8 -*-
"""fuzzy AI.ipynb

Original file is located at
    https://colab.research.google.com/drive/1BrCWd8KM1t3fHNQC6shX-HLzxR3A6_z_
"""

import pandas as pd

df = pd.read_csv("amazon.csv")

df.info()

pd.set_option('display.max_columns', None)

df.head()

df.columns

print(f"The Number of Rows are {df.shape[0]}, and columns are {df.shape[1]}.")

df.isnull().sum()

df['discounted_price'] = df['discounted_price'].str.replace("₹",'')
df['discounted_price'] = df['discounted_price'].str.replace(",",'')
df['discounted_price'] = df['discounted_price'].astype('float64')

df['actual_price'] = df['actual_price'].str.replace("₹",'')
df['actual_price'] = df['actual_price'].str.replace(",",'')
df['actual_price'] = df['actual_price'].astype('float64')

df['discount_percentage'] = df['discount_percentage'].str.replace('%','').astype('float64')

df['discount_percentage'] = df['discount_percentage'] / 100

df['rating'].value_counts()

df.query('rating == "|"')

filtered_links = df.loc[df['rating'] == '|', 'product_link']
print(filtered_links)

df['rating'] = df['rating'].str.replace('|', '3.9').astype('float64')

df['rating_count'] = df['rating_count'].str.replace(',', '').astype('float64')

df.info()

df.isnull().sum().sort_values(ascending= False)

round(df.isnull().sum() / len(df) * 100, 2).sort_values(ascending=False)

df.isnull().sum().sum()

df[df["rating_count"].isnull()].head()

df["rating_count"] = df.rating_count.fillna(value = df['rating_count'].median())

df.info()

df.isnull().sum().sort_values(ascending=False)

df.duplicated().any()

# df.to_csv('Amazon_clean.csv', index=False)

import numpy as np

def fuzzify_rating(value):
    if value <= 2.5:
        return {'low': 1, 'medium': 0, 'high': 0}
    elif 2.5 < value <= 3:
        return {'low': (3 - value) / 0.5, 'medium': (value - 2.5) / 0.5, 'high': 0}
    elif 3 < value <= 4:
        return {'low': 0, 'medium': (4 - value) / 1, 'high': (value - 3) / 1}
    else:
        return {'low': 0, 'medium': 0, 'high': 1}

# Define fuzzy sets for rating_count
def fuzzify_rating_count(value):
    if value <= 20000:
        return {'few': 1, 'moderate': 0, 'many': 0}
    elif 20000 < value <= 50000:
        return {'few': (50000 - value) / 30000, 'moderate': (value - 20000) / 30000, 'many': 0}
    elif 50000 < value <= 90000:
        return {'few': 0, 'moderate': (90000 - value) / 40000, 'many': (value - 50000) / 40000}
    else:
        return {'few': 0, 'moderate': 0, 'many': 1}

#Define rules
def compute_recommendation(rating, rating_count):
    rating_fuzzy = fuzzify_rating(rating)
    count_fuzzy = fuzzify_rating_count(rating_count)

    # Apply rules
    low = min(rating_fuzzy['low'], max(count_fuzzy['few'], count_fuzzy['moderate']))
    medium = max(min(rating_fuzzy['medium'], count_fuzzy['few']),
                 min(rating_fuzzy['medium'], count_fuzzy['moderate']),
                 min(rating_fuzzy['high'], count_fuzzy['few']))
    high = max(min(rating_fuzzy['high'], count_fuzzy['moderate']),
               min(rating_fuzzy['high'], count_fuzzy['many']),
               min(rating_fuzzy['medium'], count_fuzzy['many']))
    recommendation = (low * 0.3 + medium * 0.6 + high * 1) / (low + medium + high)
    return recommendation

import matplotlib.pyplot as plt #Untuk visualisasi grafik
import math #untuk square root (RMSE)

# Input user
search_name = input("Masukkan barang yang ingin dicari: ").lower()
search_rating = float(input("Masukkan rating minimum: "))
search_rating_count = int(input("Masukkan jumlah ulasan minimum: "))
target = float(input("Masukkan target skor rekomendasi: "))

# Filter dataset sesuai kriteria input
filtered_df = df[(df['product_name'].str.lower().str.contains(search_name)) &
                 (df['rating'] >= search_rating) &
                 (df['rating_count'] >= search_rating_count)].copy()

# Hitung skor rekomendasi dan error
if not filtered_df.empty:
    filtered_df['recommendation_score'] = filtered_df.apply(
        lambda row: compute_recommendation(row['rating'], row['rating_count']), axis=1)
    filtered_df['absolute_error'] = abs(filtered_df['recommendation_score'] - target)
    filtered_df['squared_error'] = filtered_df['absolute_error'] ** 2

    MAE = filtered_df['absolute_error'].mean()
    MSE = filtered_df['squared_error'].mean()
    RMSE = math.sqrt(MSE)

    # Menampilkan hasil
    print("\nRekomendasi Produk dengan Error:")
    for _, row in filtered_df.iterrows():
        print(f"Produk: {row['product_name']}, Skor Rekomendasi: {row['recommendation_score']:.2f}, "
              f"Absolute Error: {row['absolute_error']:.2f}, Squared Error: {row['squared_error']:.2f}, Rating: {row['rating']}, Jumlah Ulasan: {row['rating_count']}")

    print(f"\nMAE: {MAE:.2f}")
    print(f"\nMSE: {MSE:.2f}")
    print(f"\nRMSE: {RMSE:.2f}")
else:
    print("Tidak ada produk yang sesuai dengan kriteria.")

# Fungsi untuk plot error
def plot_error_graph(df):
    plt.figure(figsize=(8, 4))
    plt.plot(df.index, df['recommendation_score'], color='b', label='Skor Rekomendasi')
    plt.axhline(y=target, color='g', linestyle='--', label='Target')
    plt.plot(df.index, df['absolute_error'], color='r', label='Absolute Error')
    plt.plot(df.index, df['squared_error'], color='lime', label='Squared Error')
    plt.scatter(df.index, [MAE] * len(df), color='orange', label='MAE')
    plt.scatter(df.index, [MSE] * len(df), color='yellow', label='MSE')
    plt.title("Grafik Error terhadap Data")
    plt.xlabel("Index Data")
    plt.ylabel("Error Absolut")
    plt.grid(True)
    plt.legend()
    plt.show()

# Plot grafik error
if not filtered_df.empty:
    plot_error_graph(filtered_df)