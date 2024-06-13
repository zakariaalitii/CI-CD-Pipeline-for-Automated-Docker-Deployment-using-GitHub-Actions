from flask import (
    Flask,
    session,
    render_template,
    url_for,
    request,
    redirect,
    flash,
    jsonify,
    send_from_directory,
)
import os
import time
import json
from flask_socketio import SocketIO, emit
from threading import Lock
from fpdf import FPDF

app = Flask(__name__)
app.secret_key = "your_secret_key"
socketio = SocketIO(app)

thread = None
thread_lock = Lock()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/login", methods=["POST"])
def login
    else:
        flash("User not found or an error occurred", "error")
        return render_template("index.html")


        self.set_font("Arial", "B", 12)
        self.cell(0, 10, "Public Keys of participant clients", 0, 1, "C")
        self.ln(10)

    def chapter_title(self):
        self.set_font("Arial", "", 12)
        self.cell(0, 10, "List of Public Keys:", 0, 1)
        self.ln(5)

    def chapter_body(self, accounts):
        self.set_font("Arial", "", 10)
        for account in accounts:
            self.cell(0, 8, account, 0, 1)
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font("Arial", "I", 8)
        self.cell(0, 10, f"Page {self.page_no()}", 0, 0, "C")


# ----------End PDF--------------------


@app.route("/receive_data_js", methods=["POST"])
def receive_data_js():
    data_received = request.json
    if "Client_data" in session:
        session["Client_data"] = []
    session["Client_data"] = data_received
    with open("/File.json", "r") as json_file:
        data_file = json.load(json_file)
    data_file["chart_data"]["Accu"].append(data_received["chart_data"]["Accu"])
    data_file["chart_data"]["Round"].append(data_received["chart_data"]["Round"])
    data_file["chart_data"]["Confusion_matrix"].append(
        data_received["chart_data"]["Confusion_matrix"]
    )
    data_file["chart_data"]["Loss"].append(data_received["chart_data"]["Loss"])
    data_file["chart_data"]["precision"].append(
        data_received["chart_data"]["precision"]
    )

    data_file["client_data"]["Num_Client"] = data_received["client_data"]["Num_Client"]
    data_file["client_data"]["Num_Client_selected"] = data_received["client_data"][
        "Num_Client_selected"
    ]
    data_file["client_data"]["verified_clients"] = data_received["client_data"][
        "verified_clients"
    ]
    data_file["client_data"]["Rejected_clients"] = data_received["client_data"][
        "Rejected_clients"
    ]
    data_file["time"] = data_received["time"]
    data_file["Participants"] = data_received["Participants"]
    data_file["data_set"] = data_received["data_set"]

    # Create PDF object
    pdf = PDF()
    pdf.set_title("Public Keys from Ganache")
    pdf.set_author("Your Name")
    # Add content to PDF
    pdf.add_page()
    pdf.chapter_title()
    pdf.chapter_body(data_received["Participants"])
    # Save PDF file
    pdf.output(
        "C:/Users/ZAKARIA/Documents/Study/LP_BDIA/S6/stage/project new/final_ver/static/public_keys.pdf"
    )

    # /Users/mac/Desktop/Front_End_Final/static/public_keys.pdf

    with open("File.json", "w") as json_file:
        json.dump(data_file, json_file)
    return redirect(url_for("background_thread"))


@app.route("/background_thread", methods=["GET"])
def background_thread():
    if "Client_data" in session:
        Client_data = session["Client_data"]
        # Create PDF object
        pdf = PDF()
        pdf.set_title("Public Keys from Ganache")
        pdf.set_author("Your Name")
        # Add content to PDF
        pdf.add_page()
        pdf.chapter_title()
        pdf.chapter_body(Client_data["Participants"])
        # Save PDF file
        pdf.output(
            "C:/Users/ZAKARIA/Documents/Study/LP_BDIA/S6/stage/project new/final_ver/static/public_keys.pdf"
        )
        session.clear()
    socketio.emit("data_update", Client_data, namespace="/")
    return "Data updated success"


@app.route("/static/<path:filename>")
def serve_static(filename):
    root_dir = os.path.dirname(os.getcwd())
    return send_from_directory(os.path.join(root_dir, "static"), filename)


@app.route("/dashboard")
def dashboard():
    num_versions = 3
    return render_template("dashboard.html", num_versions=num_versions)


@app.route("/buttons")
def buttons():
    return render_template("buttons.html")


# ------------------------------------------Clinets------------------------------------


@app.route("/send_data_clients", methods=["POST"])
def receive_data_table_clients():
    Cli_Data = request.json
    if "send_data_clients" in session:
        session["send_data_clients"] = []
    session["send_data_clients"] = Cli_Data

    with open("clients_data.json", "r") as json_file:
        clients_data = json.load(json_file)
    # Check if the client already exist or not
    print(Cli_Data)
    if Cli_Data["Account"] in clients_data[0]["public_keys"]:
        for index in range(1, len(clients_data)):
            if clients_data[index]["Account"] == Cli_Data["Account"]:
                clients_data[index]["data"]["Acc"].append(Cli_Data["data"]["Acc"])
                clients_data[index]["data"]["Loss"].append(Cli_Data["data"]["Loss"])
                clients_data[index]["data"]["Round"].append(Cli_Data["data"]["Round"])
                clients_data[index]["data"]["Confusion_matrix"] = Cli_Data["data"][
                    "Confusion_matrix"
                ]
                clients_data[index]["data"]["Count_row"] = Cli_Data["data"]["Count_row"]
                clients_data[index]["data"]["f1"] = Cli_Data["data"]["f1"]
                clients_data[index]["data"]["data_set"]["Rows"] = Cli_Data["data"][
                    "data_set"
                ]["Rows"]
                clients_data[index]["data"]["Confusion_matrix"] = Cli_Data["data"][
                    "Confusion_matrix"
                ]

                Cli_Data["Added"] = Cli_Data["Account"]
                Cli_Data["Account"] = ""
                socketio.emit("send_data_clients_Account", Cli_Data, namespace="/")

    else:
        # --Create new Client
        newClient = {
            "Account": Cli_Data["Account"],
            "data": {
                "Acc": [Cli_Data["data"]["Acc"]],
                "Loss": [Cli_Data["data"]["Loss"]],
                "Count_row": Cli_Data["data"]["Count_row"],
                "Round": [Cli_Data["data"]["Round"]],
                "f1": Cli_Data["data"]["f1"],
                "Confusion_matrix": {
                    "TP": Cli_Data["data"]["Confusion_matrix"]["TP"],
                    "TN": Cli_Data["data"]["Confusion_matrix"]["TN"],
                    "FP": Cli_Data["data"]["Confusion_matrix"]["FP"],
                    "FN": Cli_Data["data"]["Confusion_matrix"]["FN"],
                },
                "data_set": {"Rows": Cli_Data["data"]["data_set"]["Rows"]},
            },
        }
        clients_data[0]["public_keys"].append(newClient["Account"])
        clients_data.append(newClient)
        socketio.emit("send_data_clients_Account", newClient, namespace="/")
    # Save the updated account data to the file
    with open("clients_data.json", "w") as f:
        json.dump(clients_data, f)
    return "Data sent !!"


@app.route("/get_data_clients", methods=["GET"])
def get_data_clients():
    with open("clients_data.json", "r") as json_file:
        clients_data = json.load(json_file)
    return jsonify(clients_data)


# ------------------------------------------send_packet_data------------------------------------


@app.route("/send_packet_data", methods=["POST"])
def receive_data_table_packet():
    packet_Data = request.json
    if "send_packet_data" in session:
        session["send_packet_data"] = []
    session["send_packet_data"] = packet_Data

    with open("clients_data.json", "r") as json_file:
        packet_data_f = json.load(json_file)
    # Check if the client already exist or not
    print(packet_Data)
    if packet_Data["Account"] in packet_data_f[0]["public_keys"]:
        for index in range(1, len(packet_data_f)):
            if packet_data_f[index]["Account"] == packet_Data["Account"]:
                # packet_data[index]["data"]["Rows"].append(packet_Data["Rows"])
                # rows = packet_data_f[index]["data"]["Rows"]
                # rows.append(packet_Data["Rows"])
                rows = packet_data_f[index]["data"]["data_set"]["Rows"]
                rows.append(packet_Data["Rows"])
                #  = packet_Data["data"]["data_set"]["Rows"]
                print(len(rows))
                if len(rows) > 10:
                    rows.pop(0)  # Remove the oldest row
                packet_Data["Added"] = packet_Data["Account"]
                packet_Data["Account"] = ""
                socketio.emit("send_data_packet_Account", packet_data_f, namespace="/")
    # else:
    #     # --Create new Client
    #     newClient = {
    #         "Account": packet_Data["Account"],
    #         "data": {
    #             "Rows": [packet_Data["Rows"]]

    #         },

    #     }
    #     packet_data_f[0]["public_keys"].append(newClient["Account"])
    #     packet_data_f.append(newClient)
    #     socketio.emit("send_data_packet_Account", newClient, namespace="/")
    # Save the updated account data to the file
    with open("clients_data.json", "w") as f:
        json.dump(packet_data_f, f)
    return "Data sent !!"


@app.route("/get_packet_data", methods=["GET"])
def get_packet_data():
    with open("clients_data.json", "r") as json_file:
        packet_data = json.load(json_file)
    return jsonify(packet_data)


@app.route("/clientsPk")
def clientsPk():
    return render_template("clientsPk.html")


# -----------------------CLIENTS END-----------------------------


# ------------Transactions, blocks, accounts----------
data_transactions = "transactions_data.json"

# Load existing table data from the file
if os.path.isfile(data_transactions):
    with open(data_transactions, "r") as f:
        transactions_table_data = json.load(f)
else:
    transactions_table_data = []


@app.route("/send_data_Transactions", methods=["POST"])
def receive_data_table_transactions():
    data = request.json
    transactions_table_data.append(data)

    # Save the updated table data to the file
    with open(data_transactions, "w") as f:
        json.dump(transactions_table_data, f)

    return "Data received successfully"


@app.route("/get_data_transactions", methods=["GET"])
def get_data_transactions():
    return jsonify(transactions_table_data)


@app.route("/Transactions")
def Transactions():
    return render_template("Transactions.html")


data_accounts = "accounts_data.json"

# Load existing table data from the file
if os.path.isfile(data_accounts):
    with open(data_accounts, "r") as f:
        accounts_table_data = json.load(f)
else:
    accounts_table_data = []


@app.route("/send_data_accounts", methods=["POST"])
def receive_data_table_accounts():
    data = request.json

    existing_account = next(
        (acc for acc in accounts_table_data if acc["Account"] == data["Account"]), None
    )

    if not existing_account:
        accounts_table_data.append(data)

        # Save the updated table data to the file
        with open(data_accounts, "w") as f:
            json.dump(accounts_table_data, f)

    return "Data received successfully"


@app.route("/get_data_accounts", methods=["GET"])
def get_data_accounts():
    return jsonify(accounts_table_data)


@app.route("/accounts")
def accounts():
    return render_template("accounts.html")


data_blocks = "blocks_data.json"

# Load existing table data from the file
if os.path.isfile(data_blocks):
    with open(data_blocks, "r") as f:
        blocks_table_data = json.load(f)
else:
    blocks_table_data = []


@app.route("/send_data_blocks", methods=["POST"])
def receive_data_table_blocks():
    data = request.json
    blocks_table_data.append(data)

    # Save the updated table data to the file
    with open(data_blocks, "w") as f:
        json.dump(blocks_table_data, f)

    return "Data received successfully"


@app.route("/get_data_blocks", methods=["GET"])
def get_data_blocks():
    return jsonify(blocks_table_data)


@app.route("/blocks")
def blocks():
    return render_template("blocks.html")


# ------------Blockchain End--------------------------


@app.route("/logout")
def logout():
    # Clear the session or any user authentication-related data
    session.clear()
    # Redirect the user to the login page or any other desired page
    return render_template("index.html")


@socketio.on("connect")
def connect():
    global thread
    print("Client connected")


@socketio.on("connect2")
def connect2():
    global thread
    print("Client connected")


@socketio.on("disconnect")
def disconnect():
    print("Client disconnected", request.sid)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
