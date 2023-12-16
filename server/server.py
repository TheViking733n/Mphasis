from flask import Flask, render_template, request
from config import UPLOAD_FOLDER
import os
import customers

app = Flask(__name__)

@app.route('/')
def index():
    pnr_ranking_score = customers.PNR_RANKING['score']
    pnr_ranking_enabled = [int(v) for v in customers.PNR_RANKING['enabled']]  # int array instead of bool
    context = {
        'pnr_ranking_score': pnr_ranking_score,
        'pnr_ranking_enabled': pnr_ranking_enabled
    }
    return render_template('index.html', **context)


@app.route('/submit-dataset', methods=['POST'])
def submit_dataset():
    if 'file-1' in request.files:
        file1 = request.files['file-1']
        print(file1.filename)
        file1.save(os.path.join(UPLOAD_FOLDER, 'inv.csv'))
    else:
        sheet1 = request.form['sheet-1']
        print(sheet1)
    
    if 'file-2' in request.files:
        file2 = request.files['file-2']
        print(file2.filename)
        file2.save(os.path.join(UPLOAD_FOLDER, 'sch.csv'))
    else:
        sheet2 = request.form['sheet-2']
        print(sheet2)
    
    if 'file-3' in request.files:
        file3 = request.files['file-3']
        print(file3.filename)
        file3.save(os.path.join(UPLOAD_FOLDER, 'pnrb.csv'))
    else:
        sheet3 = request.form['sheet-3']
        print(sheet3)
    
    if 'file-4' in request.files:
        file4 = request.files['file-4']
        print(file4.filename)
        file4.save(os.path.join(UPLOAD_FOLDER, 'pnrp.csv'))
    else:
        sheet4 = request.form['sheet-4']
        print(sheet4)

    response = {
        'status': 'success',
        'title': 'Success',
        'message': 'Dataset imported successfully'
    }
    return response


@app.route('/update-pnr-ranking-rules', methods=['POST'])
def update_pnr_ranking_rules():
    data = request.get_json()
    # print(data)
    try:
        pnr_ranking_score = data['pnr_ranking_score']
        # Convert last element of pnr_ranking_score: '2000,1800,1600,1500' => [2000, 1800, 1600, 1500]
        pnr_ranking_score[-1] = list(map(int, pnr_ranking_score[-1].split(',')))
    except:
        response = {
            'status': 'error',
            'title': 'Error',
            'message': 'Invalid PNR ranking score'
        }
        return response
    
    pnr_ranking_enabled = data['pnr_ranking_enabled']
    # convert int array back to bool array
    pnr_ranking_enabled = [bool(v) for v in pnr_ranking_enabled]
    
    customers.PNR_RANKING['score'] = pnr_ranking_score
    customers.PNR_RANKING['enabled'] = pnr_ranking_enabled
    print('Updated PNR ranking rules\nPNR_RANKING = ', end='')
    print(customers.PNR_RANKING)
    response = {
        'status': 'success',
        'title': 'Success',
        'message': 'PNR ranking rules updated successfully'
    }
    return response




if __name__ == '__main__':
    app.run(debug=True)