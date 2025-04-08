#!/bin/bash

# Source environment variables
if [ -f .env ]; then
  source .env
  echo "Loaded environment variables from .env"
  echo "Using credentials: $ELK_USER:$ELK_USER_PASS"
else
  echo ".env file not found!"
  exit 1
fi

# Check if environment variables are set
if [ -z "$ELK_USER" ] || [ -z "$ELK_USER_PASS" ]; then
  echo "Error: ELK_USER or ELK_USER_PASS not set in .env file"
  exit 1
fi

# Check Elasticsearch connection
ES_URL="http://localhost:9200"
echo "Testing connection to Elasticsearch at $ES_URL"
ES_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -u "$ELK_USER:$ELK_USER_PASS" $ES_URL)

if [ "$ES_RESPONSE" == "200" ]; then
  echo "Successfully authenticated to Elasticsearch!"
else
  echo "Failed to authenticate to Elasticsearch. Status code: $ES_RESPONSE"
  echo "Check your credentials in .env file and make sure they match the ones in docker-compose.yml"
  exit 1
fi

echo "All services ready! Proceeding with ELK setup..."

# Create ILM policy
echo "Creating ILM policy..."
curl -s -X PUT "http://localhost:9200/_ilm/policy/pingpong_log_policy" \
  -u "$ELK_USER:$ELK_USER_PASS" \
  -H 'Content-Type: application/json' \
  -d '{
    "policy": {
      "phases": {
        "hot": {
          "actions": {
            "rollover": {
              "max_size": "5GB",
              "max_age": "1d"
            }
          }
        },
        "delete": {
          "min_age": "30d",
          "actions": {
            "delete": {}
          }
        }
      }
    }
  }'

# Create initial index
echo "Creating initial index..."
curl -s -X PUT "http://localhost:9200/pingpong_logs-000001" \
  -u "$ELK_USER:$ELK_USER_PASS" \
  -H 'Content-Type: application/json' \
  -d '{
    "aliases": {
      "pingpong_logs": {
        "is_write_index": true
      }
    },
    "settings": {
      "index.lifecycle.name": "pingpong_log_policy",
      "index.lifecycle.rollover_alias": "pingpong_logs"
    }
  }'

# Check if Kibana is ready
echo "Checking Kibana status..."
KIBANA_READY=false
MAX_RETRIES=10
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  if curl -s -o /dev/null -w "%{http_code}" http://localhost:5601/api/status | grep -q "200"; then
    KIBANA_READY=true
    echo "Kibana is ready!"
    break
  else
    echo "Waiting for Kibana to be ready... (${RETRY_COUNT}/${MAX_RETRIES})"
    RETRY_COUNT=$((RETRY_COUNT+1))
    sleep 5
  fi
done

if [ "$KIBANA_READY" == "true" ]; then
  # Set up Kibana index pattern
  echo "Setting up Kibana index pattern..."
  curl -s -X POST "http://localhost:5601/api/saved_objects/index-pattern" \
    -u "$ELK_USER:$ELK_USER_PASS" \
    -H 'kbn-xsrf: true' \
    -H 'Content-Type: application/json' \
    -d '{
      "attributes": {
        "title": "pingpong_logs-*",
        "timeFieldName": "@timestamp"
      }
    }'
else
  echo "Kibana is not ready, skipping index pattern setup"
fi

echo "ELK setup completed successfully!"