# from flask import Flask, jsonify, request
# import pandas as pd
# import numpy as np
# import datetime

# app = Flask(__name__)

# # Load Brent oil price dataset
# data = pd.read_csv(
#     '/home/ayalk94/Documents/GitHub/Analysis_of_Brent_Oil_Price_Dynamics/data/Copy of BrentOilPrices.csv', 
#     parse_dates=['Date'], 
#     dayfirst=True  # This allows parsing dates with day first, like "20-May-87"
# )


# # Endpoint for historical prices
# @app.route('/api/historical-prices', methods=['GET'])
# def historical_prices():
#     start = request.args.get('start')
#     end = request.args.get('end')
#     filtered_data = data.copy()
    
#     # Filter data by date range
#     if start and end:
#         filtered_data = filtered_data[(filtered_data['Date'] >= start) & (filtered_data['Date'] <= end)]
    
#     return jsonify(filtered_data.to_dict(orient='records'))

# # Endpoint for event impact data
# @app.route('/api/event-impact', methods=['GET'])
# def event_impact():
#     # Sample event impact data - Replace with actual event analysis results
#     event_data = [
#         {"date": "2022-02-24", "event": "Conflict Escalation", "impact": "increase"},
#         {"date": "2021-05-01", "event": "OPEC Production Cut", "impact": "increase"},
#     ]
#     return jsonify(event_data)

# # Endpoint for key indicators
# @app.route('/api/key-indicators', methods=['GET'])
# def key_indicators():
#     avg_price = data['Price'].mean()
#     volatility = data['Price'].std()
#     indicators = {
#         "average_price": avg_price,
#         "volatility": volatility,
#         "latest_price": data['Price'].iloc[-1],
#     }
#     return jsonify(indicators)

# if __name__ == '__main__':
#     app.run(debug=True)


# # app.py
# @app.route('/api/historical-prices', methods=['GET'])
# def get_historical_prices():
#     start = request.args.get('start')
#     end = request.args.get('end')
    
#     if start and end:
#         # Filter data by date range
#         filtered_data = data[(data['Date'] >= start) & (data['Date'] <= end)]
#         prices = filtered_data[['Date', 'Price']].to_dict(orient='records')
#     else:
#         prices = data[['Date', 'Price']].to_dict(orient='records')
        
#     return jsonify(prices)


from flask import Flask, jsonify, request
import pandas as pd
import numpy as np

app = Flask(__name__)

# Load Brent oil price dataset
data = pd.read_csv(
    '/home/ayalk94/Documents/GitHub/Analysis_of_Brent_Oil_Price_Dynamics/data/Copy of BrentOilPrices.csv', 
    parse_dates=['Date'], 
    dayfirst=True  # This allows parsing dates with day first, like "20-May-87"
)

# Endpoint for historical prices
@app.route('/api/historical-prices', methods=['GET'])
def historical_prices():
    start = request.args.get('start')
    end = request.args.get('end')
    filtered_data = data.copy()
    
    # Filter data by date range
    if start and end:
        filtered_data = filtered_data[(filtered_data['Date'] >= start) & (filtered_data['Date'] <= end)]
    
    return jsonify(filtered_data[['Date', 'Price']].to_dict(orient='records'))

# Endpoint for key indicators
@app.route('/api/key-indicators', methods=['GET'])
def key_indicators():
    avg_price = data['Price'].mean()
    volatility = data['Price'].std()
    indicators = {
        "average_price": avg_price,
        "volatility": volatility,
        "latest_price": data['Price'].iloc[-1],
    }
    return jsonify(indicators)

if __name__ == '__main__':
    app.run(debug=True)
