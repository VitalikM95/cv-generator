# Resume Generator (Test Project)

Це тестовий проект для генерації резюме.  
Складається з двох частин:

- **server/** — бекенд на Node.js + TypeScript + Express
- **client/** — фронтенд на React + Vite

---

## Запуск локально

### 0. Клонування репозиторію

```bash
 git clone https://github.com/VitalikM95/cv-generator.git
 cd cv-generator
```

### 1. Встановлення залежностей

```bash
cd client && npm install
cd ../server && npm install
```

### 2. Запуск у режимі розробки

Вже знаходячись у папці /server потрібно в файлі .env в полі OPENAI_API_KEY= видалити всі пробіли в ключі (це пов'язано з правилами безпеки GitHub) та виконати команду:

```bash
npm run dev
```
