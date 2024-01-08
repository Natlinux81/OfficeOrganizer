FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5003

ENV ASPNETCORE_URLS=http://+:5003

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["OfficeOrganizer.csproj", "./"]
RUN dotnet restore "OfficeOrganizer.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "OfficeOrganizer.csproj" -c Release -o /app/build
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y build-essential nodejs

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "OfficeOrganizer.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OfficeOrganizer.dll"]
