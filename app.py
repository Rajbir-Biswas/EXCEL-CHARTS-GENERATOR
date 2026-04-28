from flask import Flask, render_template, request
import pandas as pd
import os

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files["file"]
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(filepath)

    df = pd.read_csv(filepath)

    # Simple assumption: first 2 columns = x and y
    x = df.iloc[:, 0].tolist()
    y = df.iloc[:, 1].tolist()

    return {
        "labels": x,
        "values": y
    }


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
