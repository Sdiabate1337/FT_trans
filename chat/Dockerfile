FROM python:3.10-slim

WORKDIR /chatservice

RUN python -m venv /opt/venv

RUN /opt/venv/bin/pip install --upgrade pip

COPY requirements.txt .

COPY .env .env

RUN /opt/venv/bin/pip install --no-cache-dir -r requirements.txt

COPY * ./

ENV PATH="/opt/venv/bin:$PATH"

EXPOSE 8001

CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]
