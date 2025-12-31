from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import random
import math

app = Flask(__name__)
# Active CORS pour que ton Next.js (port 3000) puisse parler au Python (port 5000)
CORS(app)

@app.route('/api/predict', methods=['POST'])
def predict_crypto():
    data = request.json
    coin = data.get('coin', 'BTC').upper()

    # 1. Simulation d'un délai de "calcul IA"
    time.sleep(1.5)

    # 2. Logique "Cool" : Génération de données pseudo-aléatoires complexes
    # On utilise le temps pour créer une variation, mais on garde une part d'aléatoire
    volatility = random.uniform(0.5, 5.0)
    sentiment_score = random.uniform(-1, 1) # Entre -1 (Bearish) et 1 (Bullish)
    
    # Détermination de la tendance
    if sentiment_score > 0.3:
        trend = "BULLISH 🚀"
        color = "green"
    elif sentiment_score < -0.3:
        trend = "BEARISH 🐻"
        color = "red"
    else:
        trend = "NEUTRAL ⚖️"
        color = "gray"

    # Simulation d'un prix cible (Target Price)
    current_price_base = 100000 if coin == 'BTC' else 3000
    predicted_change = sentiment_score * volatility
    target_price = current_price_base * (1 + (predicted_change / 100))

    response = {
        "coin": coin,
        "ai_analysis": {
            "trend": trend,
            "confidence": f"{random.randint(75, 99)}%",
            "volatility_index": round(volatility, 2),
            "sentiment_score": round(sentiment_score, 2),
            "target_price": round(target_price, 2),
            "color": color
        },
        "timestamp": time.time()
    }

    return jsonify(response)

if __name__ == '__main__':
    print("🤖 Neural Net Crypto Engine v1.0 running on port 5000...")
    app.run(debug=True, port=5000)