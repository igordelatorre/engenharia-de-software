# Getting Started with .NET

[Install .NET 6](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)

## Available Scripts

In the project directory, you can run:

### `dotnet restore`

Install all dependencies

### `dotnet run`

Runs the api in the development mode.\
Open [https://localhost:7021/weather-forecast](http://localhost:7021/weather-forecast) to view it in the browser.

### `docker build`

```cmd
docker build . -t flipman/api
```

### `docker run`

```cmd
docker run --name=flipman-api -p 8080:80 --restart=always -d flipman/api
```
