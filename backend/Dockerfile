FROM python:3.9.6-buster
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN pip install -r requirements.txt
RUN apt-get update
RUN apt-get install net-tools
RUN apt-get install ffmpeg libsm6 libxext6  -y


CMD ["python3", "app.py", "run"]