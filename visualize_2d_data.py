import os
import argparse
import cherrypy

from jinja2 import Environment, FileSystemLoader
env = Environment(loader=FileSystemLoader('templates'))

class Server(object):
    @cherrypy.expose
    def index(self):
        tmpl = env.get_template('index.html')
        return tmpl.render()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Visualize 2D data. Useful with t-sne data.')
    parser.add_argument('--host', type=str, default='0.0.0.0', help='socket host')
    parser.add_argument('--port', type=int, default=8080, help='socket port')
    args = parser.parse_args()

    conf = {
        'global' : {
            'server.socket_host' : args.host,
            'server.socket_port' : args.port
            },
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': os.path.abspath(os.getcwd())
        },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './public'
        }
    }
    cherrypy.quickstart(Server(), '/', conf)
