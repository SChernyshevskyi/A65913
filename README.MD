# Cloud Task Manager - by Sviatoslav Chernyshevskyi 65913
 
Projekt natywnej aplikacji chmurowej realizowany w architekturze 3-warstwowej.
 
## Deklaracja Architektury (Mapowanie Azure)
Ten projekt został zaplanowany z myślą o usługach PaaS (Platform as a Service) w chmurze Azure.
 
| Warstwa | Komponent Lokalny | Usługa Azure |
| :--- | :--- | :--- |
| **Presentation** | React 19 (Vite) | Azure Static Web Apps |
| **Application** | API (.NET 9 / Node 24) | Azure App Service |
| **Data** | SQL Server (Dev) | Azure SQL Database (Serverless) |
 
## 🏗 Status Projektu i Dokumentacja
## 🚦 Status Projektu i Dokumentacja

- [x] **Artefakt 1:** Zaplanowano strukturę folderów i diagram C4 (dostępny w `/docs`).
- [x] **Artefakt 2:** Konfiguracja środowiska Docker (Docker Compose).
- [x] **Artefakt 3:** Działająca warstwa prezentacji (React + Vite w Dockerze).
- [x] **Artefakt 4:** Działająca warstwa logiki backendu (.NET 9 + SQL Connection).
- [x] **Artefakt 5:** System gotowy na chmurę.
- [x] **Artefakt 6:** Aplikacja wdrożona w Google Cloud
- [x] **Artefakt 7:** Zabezpieczona aplikacja
 
> **Informacja:** Ten plik będzie ewoluował. W kolejnych etapach dodamy tutaj sekcje 'Quick Start', opis zmiennych środowiskowych oraz instrukcję wdrożenia (CI/CD).