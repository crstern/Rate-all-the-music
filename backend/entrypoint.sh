#!/usr/bin/env bash
python app.py db init
python app.py db upgrade
python app.py db migrate
python app.py run