docker-build:
	docker build -f Dockerfile -t mconf/api-docs:latest .

up:
	docker-compose -f development.yml up

html:
	npx redoc-cli bundle openapi.yaml