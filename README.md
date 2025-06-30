# Microfrontends_Group02

### Instalar la librería Nx
```
npm i -g nx
```

### Crear workspace con Nx y Angular (monorepo)
```
npx create-nx-workspace angular-ws --preset=angular-monorepo
```

### Ejecutar un workspace
```
npx nx serve ambulance-menu
```
### Listar recursos que puede crear Nx
```
npx nx list @nx/angular
```
### Agregar un microfrontend
```
npx nx g @nx/angular:app apps/ambulance-master-tables --port 4201
npx nx g @nx/angular:app apps/ambulance-billing --port 4202
npx nx g @nx/angular:app apps/ambulance-medical-attentions --port 4203
npx nx g @nx/angular:app apps/ambulance-store --port 4204
npx nx g @nx/angular:app apps/ambulance-accounting --port 4204
```

### Agregar un component
```
npx nx g @nx/angular:component apps/ambulance-master-tables/src/app/medic/medic
```

### Transpilar los mfes
```
npx nx run-many --target=build --all --skip-nx-cache
```