# 📌 Recopilación Completa del Proyecto

## 🎯 Objetivo del Proyecto

El objetivo de este proyecto es transformar la experiencia de los fanáticos de la MLB a través de una aplicación móvil personalizada que genera y entrega resúmenes de juegos en tiempo real en múltiples formatos:

- ✅ Video clips de momentos destacados 📽️
- ✅ Narraciones en audio generadas automáticamente 🎤
- ✅ Traducciones en inglés, español y japonés 🌍

Esto permite a los fanáticos recibir contenido relevante y adaptado a sus preferencias, sin necesidad de ver el juego en vivo, mediante un sistema basado en inteligencia artificial y cloud computing.

## 🏗️ Descripción General del Proyecto

Este sistema se basa en:

- **Extracción y análisis de datos en tiempo real** desde la API GUMBO de la MLB.
- **Procesamiento y filtrado de eventos clave** como home runs, strikeouts y jugadas decisivas.
- **Generación de contenido multimedia automatizado** con Google Cloud AI (Video Intelligence, Text-to-Speech, Translation API).
- **Almacenamiento y distribución escalable** a través de Google Cloud Storage y Cloud CDN.
- **Experiencia personalizada para los usuarios**, con resúmenes según sus preferencias de equipos y jugadores.

## ⚙️ Tecnologías Utilizadas

<details>
<summary>📌 Backend (Express.js + Google Cloud)</summary>

- **Node.js + Express.js** → Servidor backend RESTful.
- **Cloud Spanner** → Base de datos relacional para almacenar usuarios, preferencias y juegos.
- **Firestore** → Base de datos NoSQL para almacenar eventos y resúmenes.
- **Redis (Memorystore)** → Caché para mejorar rendimiento y reducir latencia.
- **Google Tasks + Scheduler** → Automatización de procesamiento de datos en tiempo real.
- **Cloud Pub/Sub + Eventarc** → Notificación de eventos clave en juegos.
- **Google Cloud Logging & Monitoring** → Supervisión y diagnóstico de la infraestructura.

</details>

<details>
<summary>📌 Frontend (React Native + Expo)</summary>

- **React Native** → Framework principal para el desarrollo móvil.
- **Expo** → Permite pruebas rápidas y despliegues ágiles sin necesidad de compilación manual.
- **Axios** → Cliente HTTP para comunicación con el backend.
- **Redux** → Gestión del estado global de la app.
- **EAS (Expo Application Services)** → Para generar builds de demostración y distribución OTA.

</details>

<details>
<summary>📌 Inteligencia Artificial (Google Cloud AI)</summary>

- **Vertex AI** → Entrena modelos de Machine Learning para personalizar resúmenes según historial de usuario.
- **Google Video Intelligence API** → Recorta automáticamente clips de momentos clave en los juegos.
- **Google Text-to-Speech API** → Genera narraciones automáticas en inglés, español y japonés.
- **Google Translation API** → Traduce contenido para ofrecer una experiencia multilingüe.

</details>

## 🔄 Flujo Completo del Sistema

1. **Configuración del Usuario**
   - El usuario se registra en la app.
   - Configura sus preferencias: equipos, jugadores, tipos de jugadas.
   - Google Tasks encola una tarea para asociar sus preferencias con datos de la MLB.
   - Cloud Spanner almacena las preferencias del usuario.

2. **Captura de Datos de la MLB**
   - Google Cloud Scheduler consulta la API de GUMBO cada 10 min para juegos programados y cada 1 min para juegos en vivo.
   - Los datos de juegos y eventos se analizan y almacenan en Firestore.

3. **Procesamiento de Eventos Clave**
   - Cloud Pub/Sub detecta eventos relevantes en Firestore (gameEvents).
   - Se activan los procesos de generación de contenido multimedia:
     - 📽️ Recorte de clips con Video Intelligence API
     - 🎤 Narraciones en audio con Text-to-Speech API
     - 🌍 Traducción con Translation API

4. **Distribución y Entrega del Contenido**
   - Los clips de video y audios se almacenan en Google Cloud Storage.
   - El usuario recibe una notificación push con un enlace al resumen.
   - Cloud CDN entrega el contenido rápidamente en la app móvil.
