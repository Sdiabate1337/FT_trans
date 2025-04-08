.PHONY: all setup up down clean clean_all re

all: up wait setup

wait:
    @echo "Waiting for services to initialize..."
    @sleep 30

setup:
	chmod +x elk_setup.sh
	bash ./elk_setup.sh

up:
	@docker-compose -f ./docker-compose.yml -f docker-compose.override.yml up -d --build

down:
	@docker-compose -f ./docker-compose.yml down

clean:
	@docker-compose -f ./docker-compose.yml down -v

clean_all: clean
	@docker system prune -af

reset: clean_all all

re: down all