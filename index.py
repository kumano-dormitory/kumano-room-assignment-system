# -*- coding:utf-8 -*-

from bottle import route, run, template

@route('/hello')
def hello():
    name = "etokoro"
    return template('my_hello', name=name)

run(host='0.0.0.0', port=8080, debug=True)
