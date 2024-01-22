FROM artifactory.cloud.cms.gov/docker/python:3.11-alpine

RUN addgroup -S server && adduser -S server -G server

USER server

WORKDIR /home/server/app

COPY requirements.txt requirements.txt

COPY src/ .

EXPOSE 5000

RUN pip install -r requirements.txt

CMD ["python", "-m", "gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
