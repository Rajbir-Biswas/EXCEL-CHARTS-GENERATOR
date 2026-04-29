from flask import Flask, render_template, request, jsonify
import pandas as pd
import io

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/paste", methods=["POST"])
def paste_data():
    try:
        text = request.json.get("text", "")
        df = pd.read_csv(io.StringIO(text))

        return jsonify({
            "labels": df.iloc[:, 0].astype(str).tolist(),
            "values": df.iloc[:, 1].tolist()
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
