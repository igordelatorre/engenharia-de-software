FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base

WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /src
COPY ["Flipman.Api.csproj", "./"]

RUN dotnet restore "./Flipman.Api.csproj"

COPY . .
WORKDIR "/src/."

RUN dotnet build "Flipman.Api.csproj" -c Release -o /app/build

FROM build AS publish

RUN dotnet publish "Flipman.Api.csproj" -c Release -o /app/publish

FROM base AS final

WORKDIR /app

COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "Flipman.Api.dll"]