Browser Tools
=============

This repository is a collection of browser-based tools and tests for working with the IoT catalogue format known by the MIME type "application/vnd.tsbiot.catalogue+json".

The tools are web applications, written with node.js, using javascript and HTML in the browser.
They may be run on a public server, or locally on a PC, but are always accessed through a browser.

Contents
--------

 * server/ a web server + HTTP proxy serving:
   * server/htdocs/crawler.html a browser-based catalogue crawler and knowledge graph viewer
   * server/htdocs/explorer.html an interactive browser-based catalogue explorer and knowledge graph viewer
   * server/htdocs/map.html a browser-based catalogue mapping demo

Run the server
--------------

    npm install
    npm start

Browse to a client
------------------

Visit http://localhost:8000/


Why do I need to run the server?
--------------------------------

Almost all of the application code is client-side. The server provides an HTTP proxy (accepts GET requests to /fetch?url=) to work around the cross-domain constraints of Javascript requests.


