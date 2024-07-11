FROM python:3.12-alpine

# do not write .pyc files to disk
ENV PYTHONDONTWRITEBYTECODE=1

# do not buffer debug (useful for logging)
ENV PYTHONUNBUFFERED=1

# Add a group and user to prevent running the app as root
RUN addgroup -S server && adduser -S server -G server

# act as the user 'server'
USER server

WORKDIR /home/server/app

COPY Pipfile Pipfile.lock ./

ENV PATH=/home/server/.local/bin:$PATH

# Install dependencies (use the Pipfile.lock to ensure the exact versions are used)
RUN python -m pip install --upgrade pip && \
    python -m pip install pipenv && \
    pipenv install --deploy --ignore-pipfile

COPY src/ .

EXPOSE 5000

CMD ["pipenv", "run", "python", "-m", "gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
