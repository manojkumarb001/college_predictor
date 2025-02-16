from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load and combine Excel data
def load_data():
    try:
        df1 = pd.read_excel("college-predictor/ml-model/Round1.xlsx")
        df2 = pd.read_excel("college-predictor/ml-model/Round2.xlsx")
        df3 = pd.read_excel("college-predictor/ml-model/Round3.xlsx")

        df = pd.concat([df1, df2, df3], ignore_index=True)

        # Rename columns for consistency
        column_mapping = {
            "AGGR\nMARK": "Cutoff",
            "COMMU\nNITY": "Category",
            "COLLEGE_NAME": "College",
            "BRANCH\nCODE": "Branch",
            "ALLOTTED\nCATEGORY": "AllottedCategory",
        }
        df.rename(columns=column_mapping, inplace=True)

        return df
    except Exception as e:
        print("Error loading Excel files:", e)
        return None

df = load_data()

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if df is None:
            return jsonify({"error": "Failed to load college data"}), 500

        data = request.json
        score = int(data["score"])
        category = str(data["category"]).strip()
        location = str(data["location"]).strip()
        branch = str(data.get("branch", "")).strip()  # Branch filtering (optional)

        df["College"] = df["College"].astype(str)
        df["Category"] = df["Category"].astype(str)
        df["Branch"] = df["Branch"].astype(str)

        # Apply filters
        filtered_df = df[
            (df["Cutoff"] <= score) &
            (df["Category"].str.lower() == category.lower()) &
            (df["College"].str.contains(location, case=False, na=False))
        ]

        # Filter by branch if provided
        if branch:
            filtered_df = filtered_df[filtered_df["Branch"].str.contains(branch, case=False, na=False)]

        result = filtered_df[["College", "Branch", "Cutoff"]].to_dict(orient="records")
        print(filtered_df)

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
