from flask import Flask, render_template, request
from config import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/submit-dataset', methods=['POST'])
def submit_dataset():
    if 'file-1' in request.files:
        file1 = request.files['file-1']
        print(file1.filename)
    else:
        sheet1 = request.form['sheet-1']
        print(sheet1)
    
    if 'file-2' in request.files:
        file2 = request.files['file-2']
        print(file2.filename)
    else:
        sheet2 = request.form['sheet-2']
        print(sheet2)
    
    if 'file-3' in request.files:
        file3 = request.files['file-3']
        print(file3.filename)
    else:
        sheet3 = request.form['sheet-3']
        print(sheet3)
    
    if 'file-4' in request.files:
        file4 = request.files['file-4']
        print(file4.filename)
    else:
        sheet4 = request.form['sheet-4']
        print(sheet4)

    response = {
        'status': 'success',
        'title': 'Success',
        'message': 'Dataset imported successfully'
    }
    return response


if __name__ == '__main__':
    app.run(debug=True)