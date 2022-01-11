FROM mcr.microsoft.com/dotnet/sdk:6.0
COPY ./recipeApp/bin/Release/net5.0/publish/ App/
WORKDIR /App
CMD ASPNETCORE_URLS=http://*:$PORT dotnet recipeApp.dll
