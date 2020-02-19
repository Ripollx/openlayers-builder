# Custom OpenLayers Builder

Construeix la llibreria de [OpenLayers](https://openlayers.org/) descarregant la última versió disponible i creant un arxiu JavaScript.

Permet sobreescriu mòduls existents o afegir-ne de nous i compilar el conjunt per crear una versió personalitzada.

El constructor es una copia adaptada del projecte [OpenLayers Website Build Utilities](https://github.com/openlayers/openlayers.github.io).

## Utilitzar

Requereix tenir [Git](https://git-scm.com/) i [NodeJS](https://nodejs.org/) instal·lat.

```shell
# Només un cop: clone
git clone -b build https://github.com/Ripollx/openlayers-builder.git
cd openlayers.github.io
# Per descarregar dependencies
npm install
# Cada cop que es requereix compilar
npm run build
```

El resultat quedarà en la carpeta `build/dist/`.
