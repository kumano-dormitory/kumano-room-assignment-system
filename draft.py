from bottle import route, run, static_file, request, post
from draft_logic import process_draft

@route('/')
def index():
    return static_file('draft.html', root='.')

@route('/<filename:re:.*\.js>')
def serve_js(filename):
    return static_file(filename, root='.')

@route('/<filename:re:.*\.css>')
def serve_css(filename):
    return static_file(filename, root='.')


@post('/submit')
def submit():
    data = request.json
    round_data = data.get("round_data", {})
    winners_map = data.get("winners", {})
    
    result = process_draft(round_data, winners_map)
    return result

run(host='0.0.0.0', port=5000)
