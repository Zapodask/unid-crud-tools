$migrate = Read-host 'Migrar tabelas?(y/n)'

docker-compose up --build -d postgres

Start-Sleep -s 30

If ($migrate -eq 'y') {
    cd ./app

    yarn typeorm migration:run

    cd ..
}

docker-compose up --build app
