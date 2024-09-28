# Stellar Frontend

Este es el frontend de la aplicación Stellar, desarrollado con **Next.js** y **TypeScript**. La aplicación permite a los usuarios buscar habitaciones disponibles y realizar reservas a través de una interfaz optimizada.

## Estructura del Proyecto

```bash
📁 stellar-frontend
    📁 src
        📁 app
            📁 reservations         # Página de búsqueda de habitaciones
            📁 admin                # Página de administracion de reglas
                ─ page.tsx
            ─ globals.css           # Estilos globales
            ─ layout.tsx            # Diseño general de la aplicación
            ─ page.tsx              # Página principal 
        📁 components               # Componentes reutilizables
            📁 ui                   # Elementos de interfaz de usuario
                ─ button.tsx
                ─ card.tsx
                ─ dialog.tsx
                ─ input.tsx
                ─ label.tsx
                ─ select.tsx
            ─ AvailableResults.tsx   # Componente para mostrar resultados disponibles
            ─ SearchAvailable.tsx    # Componente para buscar habitaciones
        📁 core                     # Lógica central y repositorios
            📁 interfaces            # Definición de interfaces
            📁 repositories          # Repositorios para interacción con la API
        📁 integration               # Integración con API y hooks
            📁 actions               # Acciones relacionadas con las reservas y habitaciones
            📁 adapters              # Adaptadores para datos de reservas y habitaciones
            📁 api                   # Configuración de la API
            📁 hooks                 # Hooks para reservas y habitaciones
        📁 store                    # Manejo de estado con Zustand
        📁 utils                    # Utilidades y helpers
    ─ .env.local                    # Variables de entorno
    ─ next.config.mjs               # Configuración de Next.js
    ─ tailwind.config.ts            # Configuración de Tailwind CSS
    ─ tsconfig.json                 # Configuración de TypeScript
```

## Instalación

### Requisitos Previos

- Node.js v18+

### Configuración del Entorno

1. Clonar el repositorio:
    ```bash
    git clone git@github.com:3FE3LE/stellar-frontend.git
    cd stellar-frontend
    ```

2. Instalar las dependencias:
    ```bash
    npm install
    ```

3. Configurar las variables de entorno:
    - Crear un archivo `.env.local` basado en `.env.example` y configurar las variables necesarias, como la URL de la API del backend.

## Ejecución

- Modo desarrollo:
  ```bash
  npm run dev
  ```

- Modo producción:
  ```bash
  npm run build
  npm run start
  ```

## Scripts Principales

- **Desarrollo**: `npm run dev`
- **Construir para producción**: `npm run build`
- **Iniciar en producción**: `npm run start`
- **Lint**: `npm run lint`

## Tecnologías Utilizadas

- **Next.js**: Framework para aplicaciones React con renderizado del lado del servidor.
- **TypeScript**: Tipado estático para JavaScript.
- **Tailwind CSS**: Framework de utilidades para estilos.
- **Zustand**: Manejo de estado para React.
- **SWR**: Hook para manejo de datos remotos en React.
- **Radix UI**: Componentes accesibles y de bajo nivel para crear la interfaz.

## Componentes

El proyecto utiliza una arquitectura modular basada en componentes reutilizables ubicados en la carpeta `components/ui`. Estos incluyen:

- `Button`: Botones reutilizables.
- `Card`: Tarjetas para mostrar información.
- `Dialog`: Diálogos modales.
- `Input`: Campos de entrada de texto.
- `Select`: Menú desplegable.

## Integración con el Backend

La comunicación con el backend se realiza a través de la carpeta `src/integration`, que contiene las acciones, adaptadores y hooks necesarios para interactuar con la API REST del backend.

- **Acciones** (`actions`): Encargadas de realizar las peticiones a la API.
- **Adaptadores** (`adapters`): Estos adaptadores sirven de puente entre la lógica de negocio y la capa de integración con el API.
- **Hooks** (`hooks`): Hooks personalizados para el manejo de datos en los componentes.

## Manejo del Estado

El manejo del estado global se realiza mediante **Zustand**, permitiendo un control eficiente y reactivo del estado en la aplicación, como las reservas y la información de las habitaciones.

## Estilos

Los estilos están gestionados con **Tailwind CSS**, lo que facilita el desarrollo rápido con clases utilitarias y la configuración en el archivo `tailwind.config.ts`.

## Licencia

Este proyecto está bajo la licencia MIT.
