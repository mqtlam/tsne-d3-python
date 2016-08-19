import os
import argparse
import cherrypy

from jinja2 import Environment, FileSystemLoader
env = Environment(loader=FileSystemLoader('templates'))

DATA_FOLDER = 'data'

class Server(object):
    @cherrypy.expose
    def index(self):
        csv_file = '{0}.csv'.format(DATA_FOLDER)
        images_folder = DATA_FOLDER
        tmpl = env.get_template('index.html')
        return tmpl.render(csv_file=csv_file, images_folder=images_folder)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Visualize 2D data. Useful with t-sne data.')
    parser.add_argument('--host', type=str, default='0.0.0.0', help='socket host')
    parser.add_argument('--port', type=int, default=8080, help='socket port')
    parser.add_argument('--data', type=str, default='data', help='data path')
    args = parser.parse_args()
    DATA_FOLDER = args.data

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
